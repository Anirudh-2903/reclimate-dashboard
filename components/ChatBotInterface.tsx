"use client";

import React, { useState, useRef, useEffect } from "react";
import { Send, Bot, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { fetchAIResponse } from "@/services/aiResponse";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from "rehype-raw";


type Message = {
    id: string;
    content: string;
    role: "user" | "assistant";
    timestamp: Date;
    isStreaming?: boolean;
    displayedContent?: string;
};

export function ChatbotInterface() {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: "1",
            content: "Hello! I'm your Biochar Optimization Assistant. How can I help you today?",
            role: "assistant",
            timestamp: new Date(),
            displayedContent: "Hello! I'm your Biochar Optimization Assistant. How can I help you today?"
        },
    ]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    // @ts-ignore
    const streamingInterval = useRef<NodeJS.Timeout>();

    // Clean up interval on unmount
    useEffect(() => {
        return () => {
            if (streamingInterval.current) {
                clearInterval(streamingInterval.current);
            }
        };
    }, []);

    // Improved smooth scrolling that works with partial messages
    const smoothScroll = () => {
        if (messagesEndRef.current) {
            const container = containerRef.current;
            if (container) {
                const target = messagesEndRef.current;
                const targetPosition = target.offsetTop + target.offsetHeight;
                const containerHeight = container.offsetHeight;
                const scrollPosition = container.scrollTop;

                // Only scroll if target is not fully visible
                if (targetPosition > scrollPosition + containerHeight) {
                    container.scrollTo({
                        top: targetPosition - containerHeight + 20, // +20 for padding
                        behavior: 'smooth'
                    });
                }
            }
        }
    };

    const simulateStreamingResponse = (messageId: string, fullContent: string) => {
        let currentIndex = 0;
        const words = fullContent.split(' ');
        const speed = 100;

        if (streamingInterval.current) {
            clearInterval(streamingInterval.current);
        }

        // Start with empty content to prevent flash
        setMessages(prev => prev.map(msg =>
            msg.id === messageId ? { ...msg, displayedContent: "" } : msg
        ));

        streamingInterval.current = setInterval(() => {
            setMessages(prev => prev.map(msg => {
                if (msg.id === messageId && currentIndex < words.length) {
                    const newContent = words.slice(0, currentIndex + 1).join(' ');
                    currentIndex++;

                    if (currentIndex % 3 === 0) { // Scroll every 3 words to reduce jumps
                        smoothScroll();
                    }
                    return { ...msg, displayedContent: newContent };
                }
                if (currentIndex >= words.length && streamingInterval.current) {
                    clearInterval(streamingInterval.current);
                    smoothScroll(); // Final scroll to ensure all content is visible
                    return { ...msg, isStreaming: false };
                }
                return msg;
            }));
        }, speed);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            content: input,
            role: "user",
            timestamp: new Date(),
            displayedContent: input
        };

        setMessages(prev => [...prev, userMessage]);
        setInput("");
        setIsLoading(true);

        try {
            const botMessageContent = await fetchAIResponse(input);
            console.log(botMessageContent);
            const botMessage: Message = {
                id: (Date.now() + 1).toString(),
                content: botMessageContent,
                role: "assistant",
                timestamp: new Date(),
                isStreaming: true,
                displayedContent: ""
            };
            setMessages(prev => [...prev, botMessage]);
            simulateStreamingResponse(botMessage.id, botMessageContent);
        } catch (error) {
            console.error("Error fetching AI response:", error);
        } finally {
            setIsLoading(false);
        }
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
                <div
                    ref={containerRef}
                    className="h-[400px] overflow-y-auto p-4 space-y-4"
                    style={{ scrollBehavior: 'smooth' }}
                >
                    {messages.map((message) => (
                        <div
                            key={message.id}
                            className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                        >
                            <div
                                className={`max-w-[80%] rounded-lg px-4 py-3 ${
                                    message.role === "user"
                                        ? "bg-green-600 text-white"
                                        : "bg-gray-200 text-gray-800"
                                }`}
                                style={{ wordBreak: 'break-word' }} // Prevents text cutoff
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
                                <div className={`prose max-w-none text-md ${
                                    message.role === "user" ? "text-white" : "text-gray-800"
                                }`}>
                                    <ReactMarkdown
                                        remarkPlugins={[remarkGfm]}
                                        rehypePlugins={[rehypeRaw]}
                                        components={{
                                            h1: ({node, ...props}) => <h1 className="text-xl font-bold my-1" {...props} />,
                                            h2: ({node, ...props}) => <h2 className="text-lg font-bold my-1" {...props} />,
                                            h3: ({node, ...props}) => <h3 className="text-base font-bold my-1" {...props} />,
                                            p: ({node, ...props}) => <p className="my-1 leading-snug" {...props} />,
                                            ul: ({node, ...props}) => <ul className="list-disc pl-5 my-1" {...props} />,
                                            ol: ({node, ...props}) => <ol className="list-decimal pl-5 my-1 -mt-1" {...props} />,
                                            li: ({node, ...props}) => <li className="my-0.5 pl-1" {...props} />,
                                        }}
                                    >
                                        {message.displayedContent || message.content}
                                    </ReactMarkdown>
                                    {message.isStreaming && (
                                        <span className="ml-1 inline-block h-4 w-1 bg-gray-500 animate-pulse align-middle"></span>
                                    )}
                                </div>
                                <p className={`text-xs opacity-70 ${
                                    message.role === "user" ? "text-white" : "text-gray-600"
                                }`}>
                                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </p>
                            </div>
                        </div>
                    ))}
                    {isLoading && (
                        <div className="flex justify-start">
                            <div className="max-w-[80%] rounded-lg px-4 py-3 bg-gray-200">
                                <div className="flex items-center gap-2">
                                    <Bot className="w-6 h-6" />
                                    <span className="text-sm font-medium">Biochar AI is thinking</span>
                                </div>
                                <div className="flex space-x-2 mt-2">
                                    <div className="w-2 h-2 rounded-full bg-gray-600 animate-bounce" style={{ animationDelay: '0ms' }} />
                                    <div className="w-2 h-2 rounded-full bg-gray-600 animate-bounce" style={{ animationDelay: '150ms' }} />
                                    <div className="w-2 h-2 rounded-full bg-gray-600 animate-bounce" style={{ animationDelay: '300ms' }} />
                                </div>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef}></div>
                </div>
            </CardContent>

            <CardFooter className="border p-4">
                <form onSubmit={handleSubmit} className="flex w-full items-center space-x-2">
                    <Input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Ask about biochar production..."
                        className="flex-1 text-gray-800 placeholder:text-gray-800"
                    />
                    <Button type="submit" size="icon" disabled={isLoading}>
                        <Send className="w-4 h-4" />
                    </Button>
                </form>
            </CardFooter>
        </Card>
    );
}