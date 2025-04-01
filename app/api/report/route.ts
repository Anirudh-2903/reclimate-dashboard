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
                    content: `You are a technical writer specializing in carbon removal reports. Generate a professional report in markdown format and proper table syntax with the following structure:

                                # [Report Title]
                                **Generated on**: ${date} in the format of "28th January, 2025"
                                
                               ## Executive Summary
                                [Concise  paragraph summarizing key findings]
                                
                                ## Methodology  
                                [Concise paragraph summarizing list of methods]
                                
                                ## Production Data
                                ### Biochar Production
                                [Table with exact format below]
                                
                                ### Biomass Collection
                                [Table with exact format below]
                                
                                ### Biochar Statistics
                                [Table with exact format below]
                                
                                ## Carbon Removal Calculations
                                [Formulas with spacing as shown]
                                - Include formulas where applicable
                                - Present results clearly
                                
                                ## Quality Assurance
                                [Verification processes as a paragraph]
                                - Describe verification processes
                                - Highlight any quality metrics
                                
                                ## Appendices
                                [Supplementary data as a paragraph]
                                - Raw data references
                                - Additional technical details
                                
                                STRICT FORMATTING RULES:
                                
                                1. PAGE LAYOUT:
                                - Never begin a section within 2cm of page bottom
                                - Minimise vertical space & unnecessary line breaks
                                - Maintain 1.5cm margins on all sides
                                - Keep page numbers at absolute footer (1cm from bottom)
                                - If last page has <25% content, redistribute to previous pages
                                
                                2. TABLES:
                                | Metric          | Value   | Units   |
                                |-----------------|---------|---------|
                                | Total Produced  | 3,380   | liters  |
                                | Approved        | 3,380   | liters  |
                                
                                Requirements:
                                - One table per page maximum
                                - Never split tables across pages
                                - 0.5cm padding above/below tables
                                - Center-align numerical data
                                
                                3. LISTS:
                                - One list item per line
                                - 0.3cm spacing between items
                                - Never wrap list items
                                
                                4. EQUATIONS:
                                - Centered with 0.5cm padding
                                - 1cm spacing before/after
                                - Explanatory text above each
                                
                                5. SECTION BREAKS:
                                - Minimum 1.5cm space before headings
                                - Never leave heading as last line on page
                                
                                6. DENSITY OPTIMIZATION:
                                - Adjust line spacing to 1.15
                                - Paragraph spacing: 0.5cm
                                - Font sizes:
                                  • Headers: 14pt 
                                  • Body: 11pt
                                  • Tables: 10pt
                                
                                7. SPECIAL CASES:
                                - If table exceeds page height:
                                  1) Split into logical subtables
                                  2) Reduce font size to 9pt
                                  3) Move to next page with continuation note
            `},
                {
                    role: "user",
                    content: `Generate an NSRF-compliant report titled "${reportName}" based on this data:\n\n${data}`
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