export default async (req, context) => {
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405, headers: { "Content-Type": "application/json" },
    });
  }

  const apiKey = process.env.ANTHROPIC_KEY;
  if (!apiKey) {
    return new Response(JSON.stringify({ error: "API key not configured" }), {
      status: 500, headers: { "Content-Type": "application/json" },
    });
  }

  let body;
  try {
    body = await req.json();
  } catch (e) {
    return new Response(JSON.stringify({ error: "Invalid body" }), {
      status: 400, headers: { "Content-Type": "application/json" },
    });
  }

  const { messages, tools, toolChoice, maxTokens } = body;

  // Internal timeout — abort before Netlify's hard limit kills us
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 9000);

  try {
    const payload = {
      model: tools ? "claude-sonnet-4-6" : "claude-haiku-4-5-20251001",
      max_tokens: maxTokens || 2000,
      messages,
    };
    if (tools) payload.tools = tools;
    if (toolChoice) payload.tool_choice = toolChoice;

    console.log("[generate] model:", payload.model, "| tools:", !!tools);

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });

    clearTimeout(timeout);
    const data = await response.json();
    console.log("[generate] done | status:", response.status, "| stop:", data?.stop_reason);

    return new Response(JSON.stringify(data), {
      status: response.status,
      headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
    });
  } catch (err) {
    clearTimeout(timeout);
    const isTimeout = err.name === "AbortError";
    console.error("[generate] error:", err.name, err.message);
    // On timeout, return a soft signal so the browser can skip and continue
    return new Response(
      JSON.stringify({ error: isTimeout ? "TIMEOUT" : err.message, _timeout: isTimeout }),
      { status: isTimeout ? 200 : 500, headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" } }
    );
  }
};

export const config = { path: "/api/generate" };
