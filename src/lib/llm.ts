import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function callLocalLLM(messages: { role: "system" | "user" | "assistant"; content: string }[]): Promise<string> {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: messages as any,
      temperature: 0.7,
      max_tokens: 300,
    });

    return response.choices[0]?.message?.content || "";
  } catch (error) {
    console.error("OpenAI API Error:", error);
    return "";
  }
}

export async function fetchEmbeddings(inputs: string[]): Promise<number[][]> {
  try {
    const response = await openai.embeddings.create({
      model: "text-embedding-3-small",
      input: inputs,
    });
    return response.data.map((item) => item.embedding);
  } catch (error) {
    console.error("OpenAI Embedding Error:", error);
    return inputs.map(() => new Array(1536).fill(0));
  }
}
