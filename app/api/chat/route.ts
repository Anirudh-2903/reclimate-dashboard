import OpenAI from "openai";
import { NextRequest, NextResponse } from "next/server";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY!,
});

export const runtime = 'edge';


export async function POST(req: NextRequest) {
    try {
        const { query } = await req.json();

        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 25 * 1000);

        const response = await openai.chat.completions.create({
            messages: [{ role: "assistant", content: "You are an expert in biochar production, guiding farmers on optimal conditions." }, { role: "user", content: query }],
            model: "gpt-4o-mini-2024-07-18",
        },{
            signal: controller.signal,
        });
        clearTimeout(timeout);
        return NextResponse.json(
            { reply: response.choices[0].message.content },
            { status: 200 }
        );
    } catch (error) {
        console.error("OpenAI API error:", error);
        if (error instanceof Error && error.name === 'AbortError') {
            return NextResponse.json(
                { message: "Request timeout - please try again with a more specific query" },
                { status: 504 }
            );
        }

        return NextResponse.json(
            { message: "Error processing your request" },
            { status: 500 }
        );
    }
}
