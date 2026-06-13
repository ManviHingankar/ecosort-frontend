const API_KEY = process.env.REACT_APP_OPENROUTER_KEY;

export const askEcoSortAI = async (message) => {

  try {

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "http://localhost:3000",
        "X-Title": "EcoSort AI"
      },
      body: JSON.stringify({
        model: "meta-llama/llama-3.1-8b-instruct",
        messages: [
          {
            role: "system",
            content: `
You are EcoSort AI assistant.

Answer questions about e-waste recycling and the EcoSort platform.

Rules:
- Keep answers SHORT (1-2 lines maximum)
- Use simple language
- Focus only on the important point
`
          },
          {
            role: "user",
            content: message
          }
        ]
      })
    });

    const data = await response.json();

    console.log("AI RESPONSE:", data);

    if (data && data.choices && data.choices.length > 0) {
      return data.choices[0].message.content;
    }

    if (data.error) {
      return "AI Error: " + data.error.message;
    }

    return "EcoSort AI couldn't respond.";

  } catch (error) {

    console.error("Chatbot error:", error);
    return "EcoSort AI is currently unavailable.";

  }

};