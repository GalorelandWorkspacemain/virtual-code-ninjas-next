// app/api/ai-tutor/route.js (Node server-side)
import { NextResponse } from "next/server";
import OpenAI from "openai";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req) {
  const { promptContext } = await req.json();
  if(!promptContext) return NextResponse.json({ error: "Missing context" }, { status: 400 });

  const system = `You are a friendly coding tutor that gives concise, step-by-step debugging hints for kids (9-15). Use simple language.`;

  const userPrompt = `
  Student's failing info:
  ${promptContext}

  Provide:
  1) Short explanation (1-2 sentences)
  2) Concrete next step to fix
  3) Example snippet if helpful
  `;

  const response = await client.chat.completions.create({
    model: "gpt-4o-mini", // choose model you have access to
    messages: [
      { role: "system", content: system },
      { role: "user", content: userPrompt }
    ],
    max_tokens: 500,
  });

  const text = response.choices?.[0]?.message?.content ?? "Sorry, no response.";
  return NextResponse.json({ advice: text });
}
