const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY, // MUST be set
});

async function generateResponse(chatHistory) {
  try {
    // Format the chat history properly for Gemini API
    const formattedHistory = chatHistory.map(msg => ({
      role: msg.role,
      parts: [{ text: msg.parts[0].text }]
    }));

    const response = await ai.models.generateContent({
      model: "gemini-1.5-flash", // Using free tier model
      contents: formattedHistory,
    });

    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    
    // Handle specific error cases
    if (error.message && error.message.includes("quota")) {
      return " API quota exceeded. Please check your Gemini API billing or try again later.";
    }
  }
}

module.exports = generateResponse;
