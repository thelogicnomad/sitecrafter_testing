import OpenAI from "openai";

// Pool of all available Gemini keys
const geminiKeys = [
  process.env.gemini,
  process.env.gemini2, 
  process.env.gemini3
].filter(Boolean) as string[];

if (geminiKeys.length === 0) {
  throw new Error("No Gemini API keys found in environment");
}

console.log(`[GeminiPool] Initialized with ${geminiKeys.length} API keys`);

// Round-robin index
let currentIndex = 0;

// Create clients for each key
const clients = geminiKeys.map((key, index) => ({
  client: new OpenAI({
    baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/",
    apiKey: key
  }),
  keyIndex: index + 1,
  callCount: 0
}));

/**
 * Get next available Gemini client in round-robin fashion
 */
export function getNextGeminiClient() {
  const clientInfo = clients[currentIndex % clients.length];
  clientInfo.callCount++;
  
  console.log(`[GeminiPool] Using gemini${clientInfo.keyIndex} (call #${clientInfo.callCount})`);
  
  currentIndex++;
  return clientInfo.client;
}

/**
 * Get client stats for debugging
 */
export function getPoolStats() {
  return clients.map((c, i) => ({
    key: `gemini${c.keyIndex}`,
    calls: c.callCount
  }));
}
