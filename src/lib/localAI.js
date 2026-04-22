let generator = null;
let loading = false;

export async function getModel() {
  if (generator) return generator;

  if (loading) {
    return new Promise((resolve) => {
      const interval = setInterval(() => {
        if (generator || !loading) {
          clearInterval(interval);
          resolve(generator);
        }
      }, 100);
    });
  }

  loading = true;

  try {
    const { pipeline } = await import("@xenova/transformers");
    generator = await pipeline("text-generation", "Xenova/gpt2");
    console.log("✅ Model loaded");
  } catch (err) {
    generator = null;
    console.error("Model load error:", err);
  } finally {
    loading = false;
  }

  return generator;
}

export async function safeAIResponse(message) {
  try {
    const model = await getModel();
    if (!model) return null;

    const prompt = typeof message === "string" ? message : String(message ?? "");
    const output = await model(prompt, {
      max_new_tokens: 50,
    });

    return output?.[0]?.generated_text || null;
  } catch (err) {
    console.error("AI error:", err);
    return null;
  }
}

export async function generateAIResponse(message) {
  return safeAIResponse(message);
}

export default { getModel, safeAIResponse, generateAIResponse };
