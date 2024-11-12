"use server";

import OpenAI from "openai";

export async function generateExplanationFromSchema(schema: string, explanationPart: string) {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const stream = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "user",
        content: `From the following SQL schema code:\n ${schema} \n Can you explain what this part of the code means? ${explanationPart}`
      }
    ],
    temperature: 1,
    max_tokens: 1000,
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