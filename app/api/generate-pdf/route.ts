import {COLORS} from '@/components/ReportGenerator';
import { NextResponse } from 'next/server';
import puppeteer from 'puppeteer';

export async function POST(request: Request) {
    try {
        const { htmlContent, reportName } = await request.json();
        const browser = await puppeteer.launch({
            headless: true,
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        });

        const page = await browser.newPage();
        await page.setContent(htmlContent, { waitUntil: 'networkidle0' });

        const pdfBuffer = await page.pdf({
            format: 'A4',
            printBackground: true,
        });

        await browser.close();

        return new NextResponse(pdfBuffer, {
            headers: new Headers({
                'Content-Type': 'application/pdf',
                'Content-Disposition': `attachment; filename=${encodeURIComponent(reportName)}.pdf`,
            }),
        });
    } catch (error) {
        console.error('PDF generation error:', error);
        return NextResponse.json(
            { error: 'Failed to generate PDF' },
            { status: 500 }
        );
    }
}