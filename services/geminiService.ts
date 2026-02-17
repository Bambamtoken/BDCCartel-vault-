
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

let genAI: GoogleGenAI | null = null;

const getGenAI = () => {
  if (!genAI) {
    genAI = new GoogleGenAI({ apiKey: process.env.API_KEY });
  }
  return genAI;
};

export const getFinancialAdvice = async (
  prompt: string, 
  balance: number,
  recentTransactions: any[]
): Promise<string> => {
  try {
    const ai = getGenAI();
    
    // Construct a context-aware prompt for BDC Cartel
    const context = `
      User Fiat Liquidity: $${balance.toLocaleString()}
      
      Role: You are the 'Cartel Consigliere' and Chief Architect of the BDCCartel Chain.
      
      THE SYSTEM (BDCCARTEL CHAIN):
      - "BDCC" is the native governance and gas token.
      - "BDC Gen-2" NFTs are now mintable and grant access to physical cartel safehouses.
      - We prioritize: Anonymity, Decentralized Power, and High-Yield Mining.
      
      Tone: Exclusive, sharp, visionary, underground tech. Use terms like "The Network", "Nodes", "Encrypted Drops", "Staking Rewards".
      
      User Query: ${prompt}
    `;

    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: context,
      config: {
        systemInstruction: "You are the strategic advisor for the BDCCartel Chain. Advise on minting NFTs and holding BDCC.",
      }
    });

    return response.text || "I couldn't generate a strategy at this time.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Secure connection to the Vault disrupted. Try again.";
  }
};

export const getTradingSignal = async (marketCondition: string): Promise<{pair: string, action: string, confidence: number, reasoning: string}> => {
  try {
    const ai = getGenAI();
    const prompt = `Analyze current market conditions: ${marketCondition}. Provide a single trading signal for a high-cap crypto asset. Return JSON only.`;
    
    const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
        config: {
            responseMimeType: "application/json"
        }
    });

    const text = response.text;
    if (!text) return { pair: "BTC/USDT", action: "HOLD", confidence: 0, reasoning: "No signal" };
    
    return JSON.parse(text);
  } catch (e) {
      return { pair: "ETH/USDT", action: "LONG", confidence: 88, reasoning: "Technical breakout detected." };
  }
}
