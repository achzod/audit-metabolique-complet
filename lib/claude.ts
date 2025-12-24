import Anthropic from "@anthropic-ai/sdk"

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY!,
})

export async function generateAuditWithClaude(
  responses: any,
  type: "GRATUIT" | "PREMIUM"
) {
  const prompt = type === "GRATUIT"
    ? await import("./prompts/metabolique-gratuit")
    : await import("./prompts/metabolique-premium")

  const message = await anthropic.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: type === "GRATUIT" ? 4000 : 16000,
    messages: [
      {
        role: "user",
        content: prompt.default.build(responses),
      },
    ],
  })

  const content = message.content[0]
  if (content.type === "text") {
    return content.text
  }

  throw new Error("Unexpected response format from Claude")
}
