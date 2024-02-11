import OpenAIApi from "openai";

if (!process.env.API_KEY_OPENAI) {
  throw new Error("Missing API_KEY_OPENAI environment variable");
}

export const openai = new OpenAIApi({
  apiKey: process.env.API_KEY_OPENAI,
});

export async function chatCompletion({
  messages = [],
  max_tokens = 800,
  temperature = 0,
  fallback,
  model = "gpt-3.5-turbo-0125",
  ...otherOptions
}: { fallback?: string } & Partial<OpenAIApi.Chat.ChatCompletionCreateParams>) {
  try {
    const completion = await openai.chat.completions.create({
      model,
      messages,
      max_tokens,
      temperature,
      ...otherOptions,
    });

    if (
      !(completion as OpenAIApi.Chat.Completions.ChatCompletion).choices[0]
        .message?.content
    ) {
      throw new Error("No text returned from the completions endpoint.");
    }
    return (completion as OpenAIApi.Chat.Completions.ChatCompletion).choices[0]
      .message.content;
  } catch (error) {
    if (fallback) return fallback;
    else throw error;
  }
}

export async function* chatCompletionStream({
  messages = [],
  fallback,
  max_tokens = 1600,
  temperature = 0,
  model = "gpt-3.5-turbo-0125",
}: { fallback?: string } & Partial<OpenAIApi.Chat.ChatCompletionCreateParams>) {
  try {
    const stream = await openai.chat.completions.create({
      model,
      messages,
      max_tokens,
      temperature,
      stream: true,
    });

    for await (const part of stream) {
      yield part.choices[0]?.delta?.content || "";
    }
  } catch (error) {
    console.log("error", error);
    if (fallback) yield fallback;
    else throw error;
  }
}

export async function embedding({
  input = [],
  model = "text-embedding-ada-002",
}: Partial<OpenAIApi.Embeddings.EmbeddingCreateParams>): Promise<number[][]> {
  const embedding = await openai.embeddings.create({
    model,
    input,
  });

  if (!embedding.data[0].embedding) {
    throw new Error("No embedding returned from the completions endpoint");
  }

  // Otherwise, return the embeddings
  return embedding.data.map((d) => d.embedding);
}
