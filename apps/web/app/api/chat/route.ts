// Direct OpenCode API implementation - bypasses AI SDK for zero-latency streaming

export const maxDuration = 30;

// Helper to convert UIMessage format to CoreMessage format
function convertMessages(messages: any[]): any[] {
  return messages.map((m) => {
    // Handle new parts-based format
    if (m.parts && Array.isArray(m.parts)) {
      const textParts = m.parts.filter((p: any) => p.type === "text");
      const content = textParts.map((p: any) => p.text).join("");
      return {
        role: m.role as "user" | "assistant" | "system",
        content: content || "",
      };
    }
    // Handle old content-based format
    return {
      role: m.role as "user" | "assistant" | "system",
      content: typeof m.content === "string" ? m.content : "",
    };
  });
}

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return new Response(
        JSON.stringify({ error: "Invalid messages format" }),
        { status: 400, headers: { "Content-Type": "application/json" } },
      );
    }

    const formattedMessages = convertMessages(messages);

    // Add system message
    const allMessages = [
      {
        role: "system",
        content: `You are a helpful AI assistant for Waqas Ishaque's blog. Be concise, accurate, and friendly. 
          
When providing code examples, use proper markdown code blocks with language specification.
When explaining concepts, use clear formatting with headers and bullet points when appropriate.`,
      },
      ...formattedMessages,
    ];

    // Direct fetch to OpenCode API for faster streaming
    const response = await fetch("https://opencode.ai/zen/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer public",
        "x-opencode-project": "blog-ai-chat",
        "x-opencode-session": "user-session",
        "x-opencode-request": `req-${Date.now()}`,
        "x-opencode-client": "1",
      },
      body: JSON.stringify({
        model: "gpt-5-nano",
        stream: true,
        messages: allMessages,
        temperature: 0.7,
      }),
    });

    if (!response.ok || !response.body) {
      throw new Error(`OpenCode API error: ${response.status}`);
    }

    const encoder = new TextEncoder();
    const decoder = new TextDecoder();

    // Transform the SSE stream directly to our format
    const transformStream = new TransformStream({
      transform(chunk, controller) {
        const text = decoder.decode(chunk, { stream: true });
        const lines = text.split("\n");

        for (const line of lines) {
          if (line.startsWith("data: ")) {
            const data = line.slice(6);
            if (data === "[DONE]") {
              controller.enqueue(encoder.encode(`d:{"finishReason":"stop"}\n`));
              return;
            }

            try {
              const parsed = JSON.parse(data);
              const content = parsed.choices?.[0]?.delta?.content;

              if (content) {
                // Send each token immediately in the AI SDK data stream format
                controller.enqueue(encoder.encode(`0:${JSON.stringify(content)}\n`));
              }
            } catch {
              // Skip malformed JSON
            }
          }
        }
      },
      flush(controller) {
        controller.enqueue(encoder.encode(`d:{"finishReason":"stop"}\n`));
      },
    });

    // Pipe the response through our transformer
    const stream = response.body.pipeThrough(transformStream);

    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "X-Vercel-AI-Data-Stream": "v1",
        "Cache-Control": "no-cache, no-transform",
        "X-Accel-Buffering": "no",
        "Connection": "keep-alive",
      },
    });
  } catch (error: any) {
    console.error("Chat API Error:", error);
    return new Response(
      JSON.stringify({
        error: "Failed to process chat request",
        details: error?.message || "Unknown error"
      }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }
}
