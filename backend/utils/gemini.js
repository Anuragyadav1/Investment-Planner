
// utils/gemini.js
const { GoogleGenAI } = require("@google/genai");
require("dotenv").config();
// console.log("process.env.GEMINI_API_KEY --> ", process.env.GEMINI_API_KEY);

// Initialize the GoogleGenAI instance
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// Convert Gemini's response into JSON
const extractJsonFromText = (text) => {
  const match = text.match(/{[\s\S]*}/);
  return match ? JSON.parse(match[0]) : null;
};

const callGeminiAPI = async (monthlyIncome, riskLevel) => {
    const prompt = `
    You are a financial advisor.
    
    Given a monthly income of ₹${monthlyIncome} and a risk level of "${riskLevel}", suggest a recommended allocation strategy among SIPs, cryptocurrency, and gold.
    
    Then, write a short explanation for each category based on the allocated amount and the user's risk level.
    
    Respond in the following JSON format:
    
    {
      "allocation": {
        "sips": { "percentage": number, "amount": number },
        "cryptocurrency": { "percentage": number, "amount": number },
        "gold": { "percentage": number, "amount": number }
      },
      "recommendations": {
        "sips": "Tailored advice for SIPs",
        "cryptocurrency": "Tailored advice for cryptocurrency",
        "gold": "Tailored advice for gold"
      }
    }
    `;
    

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash", // Updated model name
      contents: prompt,
    });

    const text = response.text;
    const jsonResponse = extractJsonFromText(text);
    // console.log("jsonResponse --> ", jsonResponse);

    if (!jsonResponse || !jsonResponse.allocation) {
      throw new Error("Invalid response format from Gemini");
    }

    return jsonResponse;
  } catch (error) {
    console.error("Gemini API error:", error.message);
    // Fallback if Gemini fails
    return {
      allocation: {
        sips: { percentage: 50, amount: monthlyIncome * 0.5 },
        cryptocurrency: { percentage: 30, amount: monthlyIncome * 0.3 },
        gold: { percentage: 20, amount: monthlyIncome * 0.2 },
      },
      summary: "Fallback strategy due to Gemini API error.",
    };
  }
};

module.exports = callGeminiAPI;

