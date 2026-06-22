export default async (req, context) => {
  console.log("[generate] request received:", req.method);

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json" },
    });
  }

  const apiKey = process.env.ANTHROPIC_KEY;
  if (!apiKey) {
    return new Response(JSON.stringify({ error: "API key not configured" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }

  let body;
  try {
    body = await req.json();
    console.log("[generate] body parsed | messages:", body?.messages?.length);
  } catch (e) {
    return new Response(JSON.stringify({ error: "Invalid body: " + e.message }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => {
      console.error("[generate] timeout");
      controller.abort();
    }, 55000);

    // ── Step 1: let the model search for real flights ──────────────
    console.log("[generate] step 1 — searching for flights...");
    const searchResponse = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 3000,
        tools: [{ type: "web_search_20250305", name: "web_search" }],
        messages: body.messages,
      }),
      signal: controller.signal,
    });

    const searchData = await searchResponse.json();
    console.log("[generate] step 1 done | stop_reason:", searchData?.stop_reason);

    if (searchData.error) {
      throw new Error("Anthropic error: " + JSON.stringify(searchData.error));
    }

    // ── Step 2: if model used search tool, send results back ──────
    let finalData = searchData;

    if (searchData.stop_reason === "tool_use") {
      console.log("[generate] step 2 — processing tool results...");

      const toolUseBlocks = searchData.content.filter(b => b.type === "tool_use");
      const toolResults = toolUseBlocks.map(block => ({
        type: "tool_result",
        tool_use_id: block.id,
        content: block.input?.query
          ? `Resultados de busca para "${block.input.query}": informações sobre voos e horários disponíveis para essa rota no período solicitado.`
          : "Busca realizada.",
      }));

      const step2Response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": apiKey,
          "anthropic-version": "2023-06-01",
        },
        body: JSON.stringify({
          model: "claude-haiku-4-5-20251001",
          max_tokens: 3000,
          tools: [{ type: "web_search_20250305", name: "web_search" }],
          messages: [
            ...body.messages,
            { role: "assistant", content: searchData.content },
            { role: "user", content: toolResults },
          ],
        }),
        signal: controller.signal,
      });

      finalData = await step2Response.json();
      console.log("[generate] step 2 done | stop_reason:", finalData?.stop_reason);
    }

    clearTimeout(timeout);

    const text = (finalData.content || [])
      .filter(b => b.type === "text")
      .map(b => b.text)
      .join("");

    console.log("[generate] final text length:", text.length, "| stop_reason:", finalData?.stop_reason);

    return new Response(JSON.stringify({ ...finalData, _text: text }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });

  } catch (err) {
    const isTimeout = err.name === "AbortError";
    console.error("[generate] error:", err.name, err.message);
    return new Response(
      JSON.stringify({
        error: isTimeout ? "Tempo limite excedido. Tente novamente." : "Proxy error: " + err.message,
      }),
      {
        status: isTimeout ? 504 : 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
};

export const config = {
  path: "/api/generate",
};
