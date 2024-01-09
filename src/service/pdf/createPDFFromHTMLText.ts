import {Browser, PDFOptions} from "puppeteer-core";

const puppeteer = require("puppeteer-core");

const chromium = require("@sparticuz/chromium");
chromium.setHeadlessMode = true;

export async function createPDFFromHTMLText(htmlText: string, pdfOptions?: Partial<PDFOptions>): Promise<Buffer> {
    let browser: Browser | null = null;

    try {
        await chromium.font(
            "https://cdn.jsdelivr.net/gh/webfontworld/Noto/NotoSansKR-Regular.ttf"
        );

        const launchParams = {
            args: chromium.args,
            executablePath: await chromium.executablePath(),
            defaultViewport: chromium.defaultViewport,
            headless: chromium.headless,
            ignoreHTTPSErrors: true,
        };
        browser = await puppeteer.launch(launchParams) as Browser;

        const page = await browser.newPage();

        await page.setContent(htmlText);

        const pdfFileBuffer = await page.pdf({
            format: 'a4',
            printBackground: true,
            margin: {
                left: '38px',
                top: '38px',
                right: '38px',
                bottom: '38px',
            },
            ...(pdfOptions || {})
        });

        return pdfFileBuffer;
    } catch (e) {
        console.error('Failed to createPDFFromHTML : ', e.message);
        throw new Error();
    } finally {
        if (browser) {
            console.log('Close browser!');
            await browser.close();
        }
    }
}