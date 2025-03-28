export async function fetchAIResponse(query: string): Promise<string> {
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
