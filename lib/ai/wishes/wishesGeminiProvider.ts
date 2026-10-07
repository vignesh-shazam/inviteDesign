import { GoogleGenAI, Type } from "@google/genai";

import { buildWishesPrompt } from "./wishesPrompt";

import type {
  WishAIRequest,
  WishAIGeneratedResult,
} from "./wishesTypes";

// Re-use the same server-side key — never exposed to the client.
const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  throw new Error("GEMINI_API_KEY is not configured.");
}

const ai = new GoogleGenAI({ apiKey });

export async function generateWishContent(
  request: WishAIRequest,
): Promise<WishAIGeneratedResult> {
  const prompt = buildWishesPrompt(request);

  const response = await ai.models.generateContent({
    model: "gemini-3.5-flash-lite",

    contents: prompt,

    config: {
      responseMimeType: "application/json",

      responseSchema: {
        type: Type.OBJECT,

        properties: {

          variations: {
            type: Type.ARRAY,
            minItems: 3,
            maxItems: 3,

            items: {
              type: Type.OBJECT,

              properties: {
                title: { type: Type.STRING },
                message: { type: Type.STRING },
                shortMessage: { type: Type.STRING },
                signature: { type: Type.STRING },
              },

              required: ["title", "message", "shortMessage", "signature"],
            },
          },

          design: {
            type: Type.OBJECT,

            properties: {
              style: {
                type: Type.STRING,
                enum: [
                  "elegant", "romantic", "cinematic", "luxury", "cute",
                  "playful", "minimal", "traditional", "modern",
                  "festive", "magical", "emotional", "funny",
                ],
              },

              mood: {
                type: Type.STRING,
                enum: [
                  "emotional", "romantic", "happy", "funny", "warm",
                  "inspirational", "exciting", "peaceful", "celebration",
                ],
              },

              colorTheme: {
                type: Type.STRING,
                enum: [
                  "rose-gold", "lavender", "midnight", "sunset", "ocean",
                  "emerald", "golden", "pastel", "rainbow",
                ],
              },

              layout: {
                type: Type.STRING,
                enum: ["centered", "minimal", "framed", "editorial"],
              },

              typography: {
                type: Type.STRING,
                enum: ["classic", "modern", "minimal", "elegant", "bold"],
              },

              decoration: {
                type: Type.STRING,
                enum: [
                  "floral", "hearts", "stars", "confetti", "sparkles",
                  "minimal", "balloons", "cinematic", "traditional",
                ],
              },

              animationStyle: {
                type: Type.STRING,
                enum: [
                  "romantic", "birthday", "luxury", "magical",
                  "festive", "minimal", "cinematic", "playful",
                ],
              },

              openingStyle: {
                type: Type.STRING,
                enum: ["envelope", "gift", "petals", "light", "fade", "scroll"],
              },
            },

            required: [
              "style", "mood", "colorTheme", "layout",
              "typography", "decoration", "animationStyle", "openingStyle",
            ],
          },

          sharing: {
            type: Type.OBJECT,

            properties: {
              whatsappMessage: { type: Type.STRING },
            },

            required: ["whatsappMessage"],
          },
        },

        required: ["variations", "design", "sharing"],
      },
    },
  });

  if (!response.text) {
    throw new Error("Gemini returned an empty response.");
  }

  let result: WishAIGeneratedResult;

  try {
    result = JSON.parse(response.text) as WishAIGeneratedResult;
  } catch {
    throw new Error("Gemini returned an invalid JSON response.");
  }

  if (!result.variations || result.variations.length !== 3) {
    throw new Error("Gemini did not return exactly 3 wish variations.");
  }

  if (!result.design) {
    throw new Error("Gemini did not return a design specification.");
  }

  if (!result.sharing?.whatsappMessage) {
    throw new Error("Gemini did not return sharing information.");
  }

  return result;
}
