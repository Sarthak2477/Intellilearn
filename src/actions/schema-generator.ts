"use server";

import OpenAI from "openai";

import engineeredPrompt from "@/prompts/prompt-schema-generator";
import type { ChatCompletionMessageParam } from "openai/resources/index.mjs";

export async function generateSchemaFromPrompt(prompt: string, previousPrompt?: string) {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const stream = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      ...engineeredPrompt as ChatCompletionMessageParam[],
      {
        "role": "user",
        "content": `Generate a SQL code based on this prompt ${previousPrompt ? `and on the previous model ${previousPrompt}` : ""} : ${prompt}`
      }
    ],
    temperature: 1,
    max_tokens: 2048,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    response_format: {
      "type": "text"
    },
    stream: previousPrompt === undefined, // Don't stream on diff mode
  });

  return stream;
}