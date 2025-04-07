import { NextResponse } from 'next/server';
import puppeteer from 'puppeteer';

export async function POST(request: Request) {
    const controller = new AbortController();
    const { signal } = controller;

    const timeout = setTimeout(() => {
        controller.abort('PDF generation timed out');
    }, 25000);

    try {
        const { htmlContent, reportName } = await request.json();

        if (signal.aborted) {
            throw new Error(signal.reason || 'Request aborted');
        }

        const browser = await puppeteer.launch({
            headless: true,
            args: [
                '--no-sandbox',
                '--disable-setuid-sandbox',
                '--disable-dev-shm-usage',
                '--disable-accelerated-2d-canvas',
                '--no-first-run',
                '--no-zygote',
                '--single-process',
                '--disable-gpu'
            ],
        });

        signal.addEventListener('abort', () => {
            browser.close().catch(console.error);
        });

        const page = await browser.newPage();

        if (signal.aborted) {
            throw new Error(signal.reason || 'Request aborted');
        }

        await page.setContent(htmlContent, {
            waitUntil: 'networkidle0',
            timeout: 20000
        });

        if (signal.aborted) {
            throw new Error(signal.reason || 'Request aborted');
        }

        const pdfBuffer = await page.pdf({
            format: 'A4',
            printBackground: true,
            margin: { top: '1cm', right: '1cm', bottom: '1cm', left: '1cm' },
            timeout: 20000
        });

        await browser.close();
        clearTimeout(timeout);

        return new NextResponse(pdfBuffer, {
            headers: {
                'Content-Type': 'application/pdf',
                'Content-Disposition': `attachment; filename=${encodeURIComponent(reportName)}.pdf`,
            },
        });
    } catch (error) {
        clearTimeout(timeout);

        if (error instanceof Error && error.name === 'AbortError') {
            console.error('PDF generation aborted:', error.message);
            return NextResponse.json(
                { error: 'PDF generation timed out' },
                { status: 504 }
            );
        }

        console.error('PDF generation error:', error);
        return NextResponse.json(
            {
                error: 'Failed to generate PDF',
                details: error instanceof Error ? error.message : String(error)
            },
            { status: 500 }
        );
    }
}