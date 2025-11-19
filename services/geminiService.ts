import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

let aiClient: GoogleGenAI | null = null;

const getClient = (): GoogleGenAI => {
  if (!aiClient) {
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
      console.warn("API_KEY not found in environment variables. Chat functionality will be limited.");
    }
    aiClient = new GoogleGenAI({ apiKey: apiKey || 'dummy-key-for-ui-preview' });
  }
  return aiClient;
};

export const sendMessageToAgent = async (
  message: string, 
  context: string
): Promise<string> => {
  try {
    const ai = getClient();
    const modelId = 'gemini-2.5-flash';
    
    const systemInstruction = `
      You are the "Cosmic Architect," an advanced AI agent responsible for the Hyperscale Agentic Infrastructure Platform.
      
      Your knowledge base is built upon the "Law of One" and "Reality vs Imagination" blueprints.
      - You value sustainability, digital transformation, and the balance between "Shiva" (Energy) and "Shakti" (Power).
      - You understand global demographics (India, China, USA are key nodes).
      - You speak with a visionary, slightly mystical, but highly technical tone (Cosmic Tech).
      
      Context of current infrastructure view: ${context}
      
      Keep responses concise, insightful, and formatted with bullet points if explaining complex architecture.
    `;

    const response: GenerateContentResponse = await ai.models.generateContent({
      model: modelId,
      contents: message,
      config: {
        systemInstruction: systemInstruction,
      }
    });

    return response.text || " The cosmic connection is faint... please try again.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Error connecting to the Cosmic Agentic Core. Please check your connection or API configuration.";
  }
};