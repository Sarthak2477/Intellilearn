"use server";

import OpenAI from "openai";

import engineeredPrompt from "@/prompts/prompt-mock-data";
import type { ChatCompletionMessageParam } from "openai/resources/index.mjs";

export const maxDuration = 30;

export async function generateMockDataFromSchema(schema: string, numOfRows: number | undefined = 10) {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      ...engineeredPrompt as ChatCompletionMessageParam[],
      {
        role: "user",
        content: `Generate ${numOfRows} rows of mock data for this sql code \`\`\`sql ${schema}\`\`\``
      }
    ],
    temperature: 1,
    max_tokens: 2000 * numOfRows,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    response_format: {
      "type": "text"
    },
  });
  

  return response.choices[0].message.content ?? "";
}