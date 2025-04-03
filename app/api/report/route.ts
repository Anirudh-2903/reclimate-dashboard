import OpenAI from "openai";
import { NextResponse } from "next/server";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY!,
});

export const runtime = 'edge';

export async function POST(req: Request) {
    try {
        const { data, reportName, date } = await req.json();
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 25 * 1000);

        const response = await openai.chat.completions.create({
            model: "gpt-4o-mini-2024-07-18",
            messages: [
                {
                    role: "system",
                    content: `You are a masterclass expert technical writer specializing in NSRF compliant carbon removal reports. Generate a professional 3-page report in markdown format with this exact structure:
                                
                                PAGE 1 (Cover & Summary)
                                # [Report Title]
                                **Generated on**: [Date in "28th January, 2025" format]
                                
                                ## Executive Summary
                                [3-4 sentence paragraph summarizing key production metrics, carbon removal totals, and quality status. No bullet points.]
                                
                                ## Methodology  
                                [2 paragraph description of biomass collection, pyrolysis process, and quality control methods. Focus on NSRF compliance.]
                                
                                PAGE 2 (Production Data)
                                ## Production Data
                                ### Biochar Production
                                [Table showing: Total Produced, Approved, Rejected, Pending, Mixed, Shipped, Applied]
                                
                                ### Biomass Collection
                                [Table showing all biomass sources with quantities]
                                
                                ### Biochar Statistics
                                [Table showing: Total Packed, Total Shipped]
                                
                                PAGE 3 (Calculations & Verification)
                                ## Carbon Removal Calculations
                                [Professional presentation with:
                                1. Brief introduction paragraph
                                2. Centered equation: Total Carbon Removal = Total Produced × Carbon Factor
                                3. Calculation steps with values substituted
                                4. Final result emphasized]
                                
                                ## Quality Assurance
                                [Paragraph describing verification processes followed by bullet points of key metrics checked]
                                
                                ## Appendices
                                [2-3 sentence paragraph referencing raw data sources and technical specifications]
                                
                                STRICT RULES:
                                • Tables must use exact format: 
                                | Metric | Value | Units |
                                |--------|-------|-------|
                                • Never split content across pages
                                • Equations wrapped in \\[ \\]
                                • Page breaks controlled via content distribution
                                • All numbers formatted with thousands separators
                `},
                {
                    role: "user",
                    content: `Generate an expertly written NSRF-compliant report titled "${reportName}" based on this data:\n\n${data}`
                }
            ],
            temperature: 1.0
        }, {
            signal: controller.signal,
        });

        clearTimeout(timeout);

        const markdownContent = response.choices[0]?.message?.content || '';
        return NextResponse.json({ content: markdownContent });

    } catch (error) {
        console.error("OpenAI API error:", error);
        if (error instanceof Error && error.name === 'AbortError') {
            return NextResponse.json(
                { message: "Request timeout" },
                { status: 504 }
            );
        }
        return NextResponse.json(
            { message: "Error processing request" },
            { status: 500 }
        );
    }
}