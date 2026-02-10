
import { GoogleGenAI } from "@google/genai";
import { SYSTEM_INSTRUCTION } from "../constants.ts";

export const getCrisisSupportResponse = async (userMessage: string, history: { role: 'user' | 'model', parts: { text: string }[] }[]) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  try {
    // Using gemini-3-flash-preview for simple chat/support tasks
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [
        ...history,
        { role: 'user', parts: [{ text: userMessage }] }
      ],
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
        topP: 0.8,
        // Recommended to avoid setting maxOutputTokens unless explicitly required
      },
    });

    // Access the text property directly on the response object
    return response.text || "Desculpe, tive um problema ao processar sua mensagem. Estou aqui por você.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Estou com dificuldades de conexão, mas respire fundo. Você não está sozinho nessa.";
  }
};
