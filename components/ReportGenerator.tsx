"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon, Loader2 } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { toast } from "sonner";
import { Progress } from "@/components/ui/progress";

type ReportParams = {
    startDate: Date;
    endDate: Date;
    reportName: string;
};

export function ReportGenerator() {
    const [params, setParams] = useState<ReportParams>({
        startDate: new Date(new Date().setMonth(new Date().getMonth() - 1)),
        endDate: new Date(),
        reportName: "Carbon Removal Report Q1 2024"
    });
    const [isGenerating, setIsGenerating] = useState(false);
    const [progress, setProgress] = useState(0);


    const handleGenerate = async () => {
        setIsGenerating(true);
        setProgress(0);

        // Simulate report generation with progress updates
        const interval = setInterval(() => {
            setProgress(prev => {
                const newProgress = prev + Math.floor(Math.random() * 15);
                return newProgress >= 100 ? 100 : newProgress;
            });
        }, 500);

        try {
            // Simulate API call (replace with actual Firebase/OpenAI integration)
            await new Promise(resolve => setTimeout(resolve, 3000));

            clearInterval(interval);
            setProgress(100);

            toast.success("Report Generated Successfully");

            // Here you would typically:
            // 1. Call your Firebase function to generate the report
            // 2. Receive the PDF/download link
            // 3. Show success toast
        } catch (error) {
            clearInterval(interval);
            toast.error("Report Generation Failed");
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <Card className="mt-6 shadow-sm rounded-lg">
            <CardHeader className="bg-green-50 mb-4 border-b">
                <CardTitle>Carbon Removal Report</CardTitle>
                <CardDescription>
                    Generate NSRF-compliant reports based on your biochar production data
                </CardDescription>
            </CardHeader>

            <CardContent className="grid gap-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="reportName">Report Name</Label>
                        <Input
                            id="reportName"
                            value={params.reportName}
                            onChange={(e) => setParams({...params, reportName: e.target.value})}
                            placeholder="Enter report name"
                        />
                    </div>

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        {/* Start Date */}
                        <div className="space-y-2">
                            <Label className="text-sm md:text-base">Start Date</Label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="outline"
                                        className={cn(
                                            "w-full justify-start text-left font-normal",
                                            "text-sm md:text-base",
                                            "h-10 md:h-9 px-3",
                                            !params.startDate && "text-muted-foreground"
                                        )}
                                    >
                                        <CalendarIcon className="mr-2 h-4 w-4 flex-shrink-0" />
                                        <span className="truncate">
            {params.startDate ? format(params.startDate, "PP") : "Pick a date"}
          </span>
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0">
                                    <Calendar
                                        mode="single"
                                        selected={params.startDate}
                                        onSelect={(date) => date && setParams({...params, startDate: date})}
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>

                        {/* End Date */}
                        <div className="space-y-2">
                            <Label className="text-sm md:text-base">End Date</Label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="outline"
                                        className={cn(
                                            "w-full justify-start text-left font-normal",
                                            "text-sm md:text-base",
                                            "h-10 md:h-9 px-3",
                                            !params.endDate && "text-muted-foreground"
                                        )}
                                    >
                                        <CalendarIcon className="mr-2 h-4 w-4 flex-shrink-0" />
                                        <span className="truncate">
            {params.endDate ? format(params.endDate, "PP") : "Pick a date"}
          </span>
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0">
                                    <Calendar
                                        mode="single"
                                        selected={params.endDate}
                                        onSelect={(date) => date && setParams({...params, endDate: date})}
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>
                    </div>
                </div>

                {isGenerating && (
                    <div className="space-y-2">
                        <div className="flex justify-between text-sm text-muted-foreground">
                            <span>Generating report...</span>
                            <span>{progress}%</span>
                        </div>
                        <Progress value={progress} className="h-2" />
                    </div>
                )}
            </CardContent>

            <CardFooter className="flex justify-end">
                <Button onClick={handleGenerate} disabled={isGenerating}>
                    {isGenerating ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Generating...
                        </>
                    ) : (
                        "Generate Report"
                    )}
                </Button>
            </CardFooter>
        </Card>
    );
}