import fetch from 'node-fetch';

async function testOllama() {
  console.log("Testing Ollama Chat Completion...");
  try {
    const res = await fetch("http://localhost:11434/v1/chat/completions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "mistral",
        messages: [{ role: "user", content: "Say hello in one word." }],
      }),
    });
    const data = await res.json();
    console.log("Response:", data.choices[0].message.content);
  } catch (err) {
    console.error("Chat Error:", err.message);
  }

  console.log("\nTesting Ollama Embeddings...");
  try {
    const res = await fetch("http://localhost:11434/api/embeddings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "nomic-embed-text",
        prompt: "Entraiot is an AI & IoT company.",
      }),
    });
    const data = await res.json();
    console.log("Embedding length:", data.embedding.length);
  } catch (err) {
    console.error("Embedding Error:", err.message);
  }
}

testOllama();
