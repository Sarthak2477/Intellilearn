"use server";

import OpenAI from "openai";

import engineeredPrompt from "@/prompts/prompt-documentation-generator";
import type { ChatCompletionMessageParam } from "openai/resources/index.mjs";

export async function generateDocumentationFromSchema(schema: string) {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      ...engineeredPrompt as ChatCompletionMessageParam[],
      {
        "role": "user",
        "content": `Generate a documentation based on this schema: ${schema}`
      }
    ],
    temperature: 1,
    max_tokens: 5000,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    stream: true,
  });

  return response;
}