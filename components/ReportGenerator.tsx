// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Progress } from "@/components/ui/progress";
import {Loader2, Download, Eye} from "lucide-react";
import { generateReportContent } from "@/services/reportGenerator";
import { generatePDF } from "@/services/aiResponse";

interface ReportGeneratorProps {
    producedBiochar: {
        approved: number;
        rejected: number;
        pending: number;
        mixed: number;
        shipped: number;
        applied: number;
        total: number;
    };
    biomassCollected: { label: string; value: number }[];
    biocharStats: {
        totalPacked: number;
        totalShipped: number;
    };
}

export const COLORS = {
    darkGreen: '#2F5C56',
    mutedGreen: '#3E7D75',
    lightGray: '#EAEDED',
};

export function markdownToHtml(markdown: string): string {
    markdown = markdown.replace(/^```markdown\n|\n```$/g, '');

    let html = markdown.replace(
        /^\|(.+)\|\r?\n\|(?:\s*\-+\s*\|)+\r?\n((?:\|.*\|\r?\n)+)/gm,
        (match, headers, rows) => {
            headers = headers.split('|').map(h => h.trim());
            rows = rows.split('\n').filter(row => row.trim());

            let tableHtml = '<table class="data-table">\n<thead>\n<tr>';
            headers.forEach(header => {
                if (header) tableHtml += `<th>${header}</th>`;
            });
            tableHtml += '</tr>\n</thead>\n<tbody>';

            rows.forEach(row => {
                if (row.trim()) {
                    const cells = row.split('|').map(c => c.trim());
                    tableHtml += '\n<tr>';
                    cells.forEach(cell => {
                        if (cell) tableHtml += `<td>${cell}</td>`;
                    });
                    tableHtml += '</tr>';
                }
            });

            return tableHtml + '</tbody>\n</table>';
        }
    );

    html = html.replace(
        /\\\[([\s\S]*?)\\\]/g,
        '<div class="equation">\\($1\\)</div>'
    );

    html = html.replace(
        /\\\(([\s\S]*?)\\\)/g,
        '<span class="inline-equation">\\($1\\)</span>'
    );

    html = html
        .replace(/^# (.*$)/gm, '<h1>$1</h1>')
        .replace(/^## (.*$)/gm, '<h2>$1</h2>')
        .replace(/^### (.*$)/gm, '<h3>$1</h3>')
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        .replace(/^\* (.*$)/gm, '<li>$1</li>')
        .replace(/(<li>.*<\/li>)/gm, '<ul>$1</ul>')
        .replace(/`([^`]+)`/g, '<code>$1</code>')
        .replace(/\n\n/g, '<br><br>');

    return html;
}

export function ReportGenerator({
                                    producedBiochar,
                                    biomassCollected,
                                    biocharStats
                                }: ReportGeneratorProps) {
    const [reportName, setReportName] = useState(
        `Carbon Removal Report Q${Math.floor(new Date().getMonth() / 3) + 1} ${new Date().getFullYear()}`
    );
    const [isGenerating, setIsGenerating] = useState(false);
    const [progress, setProgress] = useState(0);
    const [pdfUrl, setPdfUrl] = useState<string | null>(null);

    const handleGenerate = async () => {
        setIsGenerating(true);
        setProgress(0);
        setPdfUrl(null);

        try {
            // Generate report content
            setProgress(30);
            const markdownContent = await generateReportContent(
                { producedBiochar, biomassCollected, biocharStats },
                reportName,
                new Date(),
            );

            // Convert to HTML
            setProgress(60);
            console.log(markdownContent);
            const htmlContent = convertToHtml(markdownContent, reportName);

            // Generate PDF
            setProgress(80);
            const pdfBlob = await generatePDF(htmlContent, reportName);
            const url = URL.createObjectURL(pdfBlob);

            setPdfUrl(url);
            setProgress(100);
            toast.success("Report generated successfully");
        } catch (error) {
            toast.error("Failed to generate report");
            console.error(error);
        } finally {
            setIsGenerating(false);
        }
    };

    const handleDownload = () => {
        if (pdfUrl) {
            const a = document.createElement('a');
            a.href = pdfUrl;
            a.download = `${reportName}.pdf`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        }
    };

    const convertToHtml = (markdown: string, title: string) => {
        return `
      <!DOCTYPE html>
    <html>
    <head>
      <title>${title}</title>
      <script src="https://polyfill.io/v3/polyfill.min.js?features=es6"></script>
      <script id="MathJax-script" async src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"></script>
      <style>
        body { 
          font-family: Arial, sans-serif; 
          line-height: 1.6; 
          padding: 40px;
          background-color: ${COLORS.lightGray};
        }
        h1 { 
          color: ${COLORS.darkGreen}; 
          border-bottom: 2px solid ${COLORS.mutedGreen};
          padding-bottom: 10px;
        }
        h2 { color: ${COLORS.mutedGreen}; }
        table {
          width: 100%;
          border-collapse: collapse;
          margin: 20px 0;
          background: white;
        }
        .data-table {
          width: 100%;
          border-collapse: collapse;
          margin: 20px 0;
          background: white;
          box-shadow: 0 2px 3px rgba(0,0,0,0.1);
        }
        
        .data-table th {
          background-color: ${COLORS.mutedGreen};
          color: white;
          padding: 12px;
          text-align: left;
        }
        
        .data-table td {
          padding: 10px 12px;
          border-bottom: 1px solid #eee;
        }
        
        .data-table tr:nth-child(even) {
          background-color: #f8f8f8;
        }
        
        .data-table tr:hover {
          background-color: #f1f1f1;
            th {
              background-color: ${COLORS.mutedGreen};
              color: white;
            }
            th, td {
              border: 1px solid #ddd;
              padding: 8px;
              text-align: left;
            }
        .footer {
          margin-top: 40px;
          padding-top: 20px;
          border-top: 1px solid #ddd;
          color: #666;
          font-size: 0.9em;
        }
        .table-metrics {
          width: 60%;
          margin: 20px auto;
        }
        
        .table-raw-data {
          font-size: 0.9em;
        }
        .equation {
          font-family: "Times New Roman", serif;
          font-size: 1.1em;
          text-align: center;
          margin: 20px 0;
          padding: 15px;
          background-color: #f8f9fa;
          border-radius: 4px;
        }
        
        .calculation {
          margin: 25px 0;
          padding: 15px;
          background-color: #f8f9fa;
          border-radius: 4px;
        }
        
        .calculation-step {
          margin: 10px 0;
          padding-left: 20px;
        }
      </style>
    </head>
    <body>
      ${markdownToHtml(markdown)}
    </body>
    </html>
    `;
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
                <div className="space-y-2">
                    <Label htmlFor="reportName">Report Name</Label>
                    <Input
                        id="reportName"
                        value={reportName}
                        onChange={(e) => setReportName(e.target.value)}
                        placeholder="Enter report name"
                    />
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

            <CardFooter className="flex justify-end gap-2">
                {pdfUrl && (
                    <>
                        <Button
                            variant="outline"
                            onClick={() => window.open(pdfUrl, '_blank')}
                            className="flex items-center gap-2"
                        >
                            <Eye className="h-4 w-4" />
                            View Report
                        </Button>
                        <Button
                            variant="outline"
                            onClick={handleDownload}
                            className="flex items-center gap-2"
                        >
                            <Download className="h-4 w-4" />
                            Download Report
                        </Button>
                    </>
                )}
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