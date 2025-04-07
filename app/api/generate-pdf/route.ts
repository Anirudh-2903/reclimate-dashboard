import { NextResponse } from 'next/server';
import puppeteer from 'puppeteer-core';
import chromium from '@sparticuz/chromium-min';

export async function POST(request: Request) {
    const abortController = new AbortController();
    const timeout = setTimeout(() => abortController.abort(), 25000);

    try {
        const { htmlContent, reportName } = await request.json();

        const browser = await puppeteer.launch({
            args: chromium.args,
            executablePath: await chromium.executablePath(
                process.env.CHROME_EXECUTABLE_PATH
            ),
            headless: chromium.headless,
            defaultViewport: chromium.defaultViewport,
        });

        const cleanup = async () => {
            clearTimeout(timeout);
            try {
                if (browser && browser.process() != null) {
                    await browser.close();
                }
            } catch (e) {
                console.error('Browser cleanup error:', e);
            }
        };

        abortController.signal.addEventListener('abort', cleanup);

        const page = await browser.newPage();
        page.setDefaultTimeout(10000);

        await page.setContent(htmlContent, {
            waitUntil: 'domcontentloaded',
            timeout: 10000
        });

        const pdfBuffer = await page.pdf({
            format: 'A4',
            printBackground: true,
            margin: { top: '1cm', right: '1cm', bottom: '1cm', left: '1cm' },
            timeout: 10000
        });

        await cleanup();

        return new NextResponse(pdfBuffer, {
            headers: {
                'Content-Type': 'application/pdf',
                'Content-Disposition': `attachment; filename=${encodeURIComponent(reportName || 'document')}.pdf`,
            },
        });

    } catch (error) {
        console.error('PDF generation error:', error);
        return NextResponse.json(
            {
                error: 'Failed to generate PDF',
                message: error instanceof Error ? error.message : 'Unknown error'
            },
            { status: 500 }
        );
    } finally {
        clearTimeout(timeout);
    }
}