import OpenAI from "openai";

// Collect available Gemini API keys from environment variables
const keys = [
  process.env.gemini,
  process.env.gemini2,
  process.env.gemini3,
].filter(Boolean) as string[];

if (keys.length === 0) {
  throw new Error(
    "No Gemini API keys found in environment variables (gemini, gemini2, gemini3)"
  );
}

// Instantiate one OpenAI client per key
const clients = keys.map(
  (key) =>
    new OpenAI({
      baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/",
      apiKey: key,
    })
);

let index = 0;

/**
 * Returns an OpenAI client in a round-robin fashion so that calls are
 * distributed evenly across all available Gemini API keys.
 */
export const getOpenAIClient = () => {
  const client = clients[index % clients.length];
  index += 1;
  return client;
};
