"use server";

import OpenAI from "openai";

import engineeredPrompt from "@/prompts/prompt-django";
import type { ChatCompletionMessageParam } from "openai/resources/index.mjs";

export const maxDuration = 30;
  
export async function generateDjangoModelFromSchema(schema: string) {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      ...engineeredPrompt as ChatCompletionMessageParam[],
      {
        "role": "user",
        "content": `Generate django models based on this schema: ${schema}`
      }
    ],
    temperature: 1,
    max_tokens: 2048,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    response_format: {
      "type" : "text"
    },
    stream: true,
  });

  return response;
}