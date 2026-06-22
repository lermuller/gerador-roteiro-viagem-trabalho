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

  const callAnthropic = async (payload) => {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    if (data.error) throw new Error(JSON.stringify(data.error));
    return data;
  };

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 55000);

    const searchTool = [{ type: "web_search_20250305", name: "web_search" }];

    // ── Step 1: force web search with tool_choice ──────────────────
    console.log("[generate] step 1 — forcing web search...");
    const step1 = await callAnthropic({
      model: "claude-sonnet-4-6",
      max_tokens: 2000,
      tools: searchTool,
      tool_choice: { type: "tool", name: "web_search" },
      messages: body.messages,
    });
    console.log("[generate] step 1 done | stop_reason:", step1.stop_reason);

    // ── Step 2: send search results back, let model process them ──
    const toolUseBlocks = (step1.content || []).filter(b => b.type === "tool_use");
    console.log("[generate] tool_use blocks:", toolUseBlocks.length);

    let messages = [...body.messages, { role: "assistant", content: step1.content }];

    if (toolUseBlocks.length > 0) {
      // Build tool_result for each search performed
      const toolResults = toolUseBlocks.map(block => ({
        type: "tool_result",
        tool_use_id: block.id,
        content: `Resultados de busca para: "${block.input?.query || ""}"`,
      }));
      messages.push({ role: "user", content: toolResults });
    }

    // ── Step 3: generate final JSON itinerary ──────────────────────
    console.log("[generate] step 2 — generating itinerary JSON...");
    const step2 = await callAnthropic({
      model: "claude-sonnet-4-6",
      max_tokens: 3000,
      tools: searchTool,
      messages,
    });
    console.log("[generate] step 2 done | stop_reason:", step2.stop_reason);

    clearTimeout(timeout);

    // Extract final text — handle possible additional tool_use loops
    let finalText = (step2.content || [])
      .filter(b => b.type === "text")
      .map(b => b.text)
      .join("");

    console.log("[generate] final text length:", finalText.length);

    return new Response(
      JSON.stringify({ content: [{ type: "text", text: finalText }], stop_reason: step2.stop_reason }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
      }
    );

  } catch (err) {
    const isTimeout = err.name === "AbortError";
    console.error("[generate] error:", err.name, err.message);
    return new Response(
      JSON.stringify({
        error: isTimeout ? "Tempo limite excedido. Tente novamente." : "Proxy error: " + err.message,
      }),
      { status: isTimeout ? 504 : 500, headers: { "Content-Type": "application/json" } }
    );
  }
};

export const config = { path: "/api/generate" };
