
import { GoogleGenAI } from "@google/genai";

// Use the correct initialization with the API_KEY environment variable directly
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getSmartSuggestions = async (cartItems: string[]) => {
  if (cartItems.length === 0) return "Add something delicious to your cart!";
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `The user has ${cartItems.join(', ')} in their canteen cart. Suggest one complementary drink or snack in 10 words or less.`,
    });
    // Accessing .text as a property as per guidelines
    return response.text || "Try a cold drink with your meal!";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Treat yourself to a snack!";
  }
};

export const getKitchenSummary = async (ordersCount: number) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `You are a canteen manager. You have ${ordersCount} pending orders. Give a one-sentence motivational quote for the kitchen staff.`,
    });
    // Accessing .text as a property as per guidelines
    return response.text || "Keep cooking, the students are hungry!";
  } catch (error) {
    return "Great job, team! Let's clear these orders.";
  }
};
