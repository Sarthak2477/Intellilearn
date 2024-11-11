import OpenAI from "openai";

import type { ChatCompletion, ChatCompletionMessageParam } from "openai/resources/index.mjs";
import { Stream } from "openai/streaming.mjs";
import { NextRequest, NextResponse } from "next/server";

import engineeredPrompt from "@/prompts/prompt-schema-generator";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  // const {
  //   prompt,
  //   previousPrompt
  // } : {
  //   prompt: string,
  //   previousPrompt?: string,
  // } = await request.;
  const prompt = request.nextUrl.searchParams.get("prompt");
  const previousPrompt = undefined;
  
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const openaiResponse = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      ...engineeredPrompt as ChatCompletionMessageParam[],
      {
        "role": "user",
        "content": `Generate a SQL code based on this prompt ${previousPrompt ? `and on the previous model ${previousPrompt}` : ""} : ${prompt}`
      }
    ],
    temperature: 1,
    max_tokens: 5000,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    response_format: {
      "type": "text"
    },
    stream: previousPrompt === undefined, // Don't stream on diff mode
  });

  if ( previousPrompt !== undefined ) {
    // No Streaming
    return Response.json({
      answer: (openaiResponse as ChatCompletion).choices[0].message.content || "",
    });
  }
  
  const stream = (openaiResponse as Stream<OpenAI.Chat.Completions.ChatCompletionChunk>).toReadableStream();
  // const response = new Response(stream, {
  //   headers: {
      
  //   }
  // });

  const response = new NextResponse(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
    }
  });

  console.log(response);
  return response;
}