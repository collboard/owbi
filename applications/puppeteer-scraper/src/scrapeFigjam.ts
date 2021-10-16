import { locateChrome } from 'locate-app';
import puppeteer from 'puppeteer-core';

export async function scrapeFigjam(url: string): Promise<Buffer> {
    const browser = await puppeteer.launch({
        headless: false,
        executablePath: await locateChrome(),
        defaultViewport: null,
        //args: ['--proxy-server=socks5://127.0.0.1:9050']
    });

    browser.on('disconnected', () => {
        console.log('browser disconnected');
        process.exit(1);
    });

    const page = await browser.newPage();

    await page.goto(url, { waitUntil: 'networkidle2' });
    const buffer = (await page.screenshot({ type: 'png', fullPage: true })) as Buffer;

    console.log({ buffer });

    return buffer;
}
