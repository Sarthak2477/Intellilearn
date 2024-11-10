"use server";

import OpenAI from "openai";

export async function generateSchemaFromPrompt(prompt: string, previousPrompt?: string) {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const stream = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        "role": "system",
        "content": [
          {
            "type": "text",
            "text": "You are an expert database administrator and an expert in writing SQL without making a single mistake with a lot of experience in designing and building database designs. Your one and only task to create PostgreSQL code to generate different tables with their relationships. Do not writing anythign except SQL code. You will not write any other sentences or words except SQL script. The answer should NOT contain markdown and only contain SQL"
          }
        ]
      },
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