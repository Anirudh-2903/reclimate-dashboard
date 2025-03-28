import OpenAI from "openai";
import {NextRequest} from "next/server";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY!,
});

export async function POST(req: NextRequest) {
    try {
        const { query } = await req.json();
        const response = await openai.chat.completions.create({
            messages: [{ role: "assistant", content: "You are an expert in biochar production, guiding farmers on optimal conditions." }, { role: "user", content: query }],
            model: "gpt-4o-mini-2024-07-18",
        });

        return new Response(
            JSON.stringify({ reply: response.choices[0].message.content }),
            { status: 200, headers: { "Content-Type": "application/json" } }
        );
    } catch (error) {
        console.error("OpenAI API error:", error);
        return new Response(
            JSON.stringify({ message: "Internal Server Error" }),
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }
}
