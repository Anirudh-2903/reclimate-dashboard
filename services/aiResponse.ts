export async function fetchAIChatResponse(query: string): Promise<string> {
    try {
        const response = await fetch("/api/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ query }),
        });
        const data = await response.json();
        return data.reply || "I'm sorry, I couldn't process that request.";
    } catch (error) {
        console.error("Error fetching AI response:", error);
        return "There was an error processing your request.";
    }
}


export async function generatePDF(htmlContent: string, reportName: string): Promise<Blob> {
    try {
        const response = await fetch("/api/generate-pdf", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ htmlContent, reportName }),
        });

        if (!response.ok) {
            throw new Error('PDF generation failed');
        }

        return await response.blob();
    } catch (error) {
        console.error("Error generating PDF:", error);
        throw error;
    }
}