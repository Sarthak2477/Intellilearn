"use server";

import engineeredPrompt from "@/prompts/prompt-explanation-generator";
import OpenAI from "openai";
import { ChatCompletionMessageParam } from "openai/resources/index.mjs";

export async function generateExplanationFromSchema(schema: string, explanationPart: string) {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const stream = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
      ...engineeredPrompt as ChatCompletionMessageParam[],
      {
        role: "user",
        content: `SQL \n ${schema} \n Section: ${explanationPart}`
      }
    ],
    temperature: 0.4,
    max_tokens: 5000,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    response_format: {
      "type": "text"
    },
    stream: true,
  });

  return stream;
}