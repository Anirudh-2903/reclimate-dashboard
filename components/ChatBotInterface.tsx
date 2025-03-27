"use client";

import React, { useState, useRef, useEffect } from "react";
import { Send, Bot, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type Message = {
    id: string;
    content: string;
    role: "user" | "assistant";
    timestamp: Date;
};

export function ChatbotInterface() {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: "1",
            content: "Hello! I'm your Biochar Optimization Assistant. How can I help you today?",
            role: "assistant",
            timestamp: new Date(),
        },
    ]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        // Add user message
        const userMessage: Message = {
            id: Date.now().toString(),
            content: input,
            role: "user",
            timestamp: new Date(),
        };
        setMessages((prev) => [...prev, userMessage]);
        setInput("");
        setIsLoading(true);

        // Simulate API call (replace with actual Firebase/OpenAI integration)
        setTimeout(() => {
            const botMessage: Message = {
                id: (Date.now() + 1).toString(),
                content: getSampleResponse(input),
                role: "assistant",
                timestamp: new Date(),
            };
            setMessages((prev) => [...prev, botMessage]);
            setIsLoading(false);
        }, 1000);
    };

    return (
        <Card className="w-full rounded-lg mt-6 shadow-sm">
            <CardHeader className="bg-green-50 p-4 border-b">
                <div className="flex items-center space-x-3">
                    <Avatar>
                        <AvatarImage src="/logo_green.png" />
                        <AvatarFallback>BC</AvatarFallback>
                    </Avatar>
                    <div>
                        <h3 className="font-semibold tracking-tight text-lg">Biochar AI Assistant</h3>
                        <p className="text-sm text-muted-foreground">
                            Ask about pyrolysis temperatures, feedstock ratios, or application methods
                        </p>
                    </div>
                </div>
            </CardHeader>

            <CardContent className="p-0">
                <div className="h-[400px] overflow-y-auto p-4 space-y-4">
                    {messages.map((message) => (
                        <div
                            key={message.id}
                            className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                        >
                            <div
                                className={`max-w-[80%] rounded-lg px-4 py-3 ${
                                    message.role === "user"
                                        ? "bg-green-600 text-white"
                                        : "bg-gray-100 text-gray-800"
                                }`}
                            >
                                <div className="flex items-center gap-2 mb-3">
                                    {message.role === "user" ? (
                                        <User className="w-6 h-6" />
                                    ) : (
                                        <Bot className="w-6 h-6" />
                                    )}
                                    <span className="text-sm font-medium">
                    {message.role === "user" ? "You" : "Biochar AI"}
                  </span>
                                </div>
                                <p className={`whitespace-pre-wrap text-md ${
                                    message.role === "user"
                                        ? "text-white"
                                        : "text-muted-foreground"
                                }`}>{message.content}</p>
                                <p className={`text-xs mt-1 opacity-70 ${
                                    message.role === "user"
                                        ? "text-white"
                                        : "text-muted-foreground"
                                }`}>
                                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </p>
                            </div>
                        </div>
                    ))}
                    {isLoading && (
                        <div className="flex justify-start">
                            <div className="max-w-[80%] rounded-lg px-4 py-3 bg-gray-100">
                                <div className="flex items-center gap-2">
                                    <Bot className="w-4 h-4" />
                                    <span className="text-xs font-medium">Biochar AI</span>
                                </div>
                                <div className="flex space-x-2 mt-2">
                                    <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" />
                                    <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce delay-100" />
                                    <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce delay-200" />
                                </div>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>
            </CardContent>

            <CardFooter className="border p-4">
                <form onSubmit={handleSubmit} className="flex w-full items-center space-x-2">
                    <Input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Ask about biochar production..."
                        className="flex-1"
                    />
                    <Button type="submit" size="icon" disabled={isLoading}>
                        <Send className="w-4 h-4" />
                    </Button>
                </form>
            </CardFooter>
        </Card>
    );
}

// Temporary function for sample responses - replace with real AI integration
function getSampleResponse(query: string): string {
    const responses = [
        "For optimal biochar production, maintain a pyrolysis temperature between 400-700°C. Higher temperatures produce more porous biochar but may reduce yield.",
        "The ideal feedstock ratio depends on your biomass type. For wood chips, a 3:1 carbon to nitrogen ratio works well for most applications.",
        "Common biochar application rates range from 5-50 tons per hectare, depending on soil conditions and crop requirements.",
        "To improve water retention, use biochar with a particle size of 2-10mm and apply it to the top 15cm of soil.",
        "For carbon sequestration, focus on slow pyrolysis which produces more stable carbon compounds compared to fast pyrolysis."
    ];

    const lowerQuery = query.toLowerCase();
    if (lowerQuery.includes("temperature")) return responses[0];
    if (lowerQuery.includes("ratio")) return responses[1];
    if (lowerQuery.includes("application")) return responses[2];
    if (lowerQuery.includes("water")) return responses[3];
    if (lowerQuery.includes("carbon")) return responses[4];

    return "I can provide guidance on biochar production parameters, feedstock selection, pyrolysis methods, and application techniques. Could you please specify your question?";
}