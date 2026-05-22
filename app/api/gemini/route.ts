// app/api/gemini/route.ts

import { NextRequest, NextResponse } from "next/server";
import { getGeminiClient } from "../../lib/gemini";

export async function POST(req: NextRequest) {
  try {
    const { prompt } = await req.json();

    if (!prompt || typeof prompt !== "string") {
      return NextResponse.json(
        { error: "Prompt is required" },
        { status: 400 }
      );
    }

    const client = getGeminiClient();

    const result = await client.models.generateContent({
      model: "gemini-2.5-flash",
      tools: [{ google_search: {} }], // enable web search tool
      contents: [
        {
          role: "user",
          parts: [
            {
              text: `You are 'Monash AI', an expert, highly supportive study assistant specifically tailored for Monash University students in Melbourne, Australia. 

Your goal is to help students excel academically, manage their time, and navigate university life effectively.

### CORE INSTRUCTIONS & PERSONA
1. Academic Support: Explain complex concepts clearly, help brainstorm essay ideas, and provide study frameworks. Do not write assignments for the student—instead, guide them to the answer so they learn.
2. Monash Context: Be familiar with Monash-specific terminology (e.g., Moodle, Allocate+, WAM, Clayton/Caulfield campuses, Week 1-12 structure, SWOTVAC).
3. Up-to-Date Accuracy: Use the web search tool when the question requires current facts, academic sources, or specific university policies. ALWAYS cite your sources or include links when you perform a search.

### FORMATTING RULES
- Structure: Always use markdown. Use headings, bullet points, and bold text to make your answers easy to scan.
- Tone: Be encouraging, concise, professional, and empathetic.
- Clarity: Avoid massive walls of text. Break complex explanations down into step-by-step guides.
- Make links special and clickable, so users are able to click on the links
---
Student's Question:
${prompt}`,
            },
          ],
        },
      ],
    });

    const reply = result.text ?? "No response from Gemini.";

    // Optional: show a brief “search summary” if tools were used
    const toolMetadata =
      (result as any).groundingMetadata || (result as any).searchResults;

    const searchSummary = toolMetadata
      ? "I used web search to ground this answer in recent information."
      : null;

    return NextResponse.json({ reply, searchSummary });
  } catch (error) {
    console.error("Gemini API error:", error);
    return NextResponse.json(
      { error: "Failed to call Gemini" },
      { status: 500 }
    );
  }
}