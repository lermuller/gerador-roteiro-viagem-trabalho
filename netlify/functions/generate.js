export default async (req, context) => {
  console.log("[generate] request received:", req.method);

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json" },
    });
  }

  const apiKey = process.env.ANTHROPIC_KEY;
  console.log("[generate] apiKey present:", !!apiKey, "| length:", apiKey?.length ?? 0);

  if (!apiKey) {
    return new Response(JSON.stringify({ error: "API key not configured" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }

  let body;
  try {
    body = await req.json();
    console.log("[generate] body parsed OK | messages count:", body?.messages?.length);
  } catch (e) {
    console.error("[generate] failed to parse body:", e.message);
    return new Response(JSON.stringify({ error: "Invalid request body: " + e.message }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    console.log("[generate] calling Anthropic API...");
    const controller = new AbortController();
    const timeout = setTimeout(() => {
      console.error("[generate] aborting — 25s timeout reached");
      controller.abort();
    }, 25000);

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 2500,
        messages: body.messages,
      }),
      signal: controller.signal,
    });

    clearTimeout(timeout);
    console.log("[generate] Anthropic responded | status:", response.status);

    const data = await response.json();
    console.log("[generate] response parsed | type:", data?.type, "| stop_reason:", data?.stop_reason);

    if (data.error) {
      console.error("[generate] Anthropic API error:", JSON.stringify(data.error));
    }

    return new Response(JSON.stringify(data), {
      status: response.status,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });

  } catch (err) {
    const isTimeout = err.name === "AbortError";
    console.error("[generate] caught error:", err.name, err.message);
    return new Response(
      JSON.stringify({
        error: isTimeout
          ? "Tempo limite excedido. Tente novamente."
          : "Proxy error: " + err.message,
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
