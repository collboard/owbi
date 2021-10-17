import { locateChrome } from 'locate-app';
import puppeteer from 'puppeteer-core';
import { forTime } from 'waitasecond';
import { WhiteboardFile } from '../../file-parser/src/WhiteboardFile';

export async function scrapeFigjam(url: string): Promise<WhiteboardFile> {
    const browser = await puppeteer.launch({
        headless: true,
        executablePath: await locateChrome(),
        defaultViewport: null,
        //args: ['--proxy-server=socks5://127.0.0.1:9050']
    });

    /* TODO:
    browser.on('disconnected', () => {
        throw new Error('browser disconnected');
    });
    */

    const page = await browser.newPage();

    await page.setViewport({
        width: 1920,
        height: 1080,
    });

    await page.goto(url, { waitUntil: 'networkidle2' });

    await forTime(100);

    // Remove UI
    await page.evaluate(`document.querySelector("[class^='footer_banner']").remove();`);
    await page.evaluate(`document.querySelector("[class^='toolbar_view--']").remove();`);

    await forTime(3000);

    const fullPageScreenshotBuffer = (await page.screenshot({ type: 'png', fullPage: true })) as Buffer;
    const fullPageData = `data:image/png;base64,${fullPageScreenshotBuffer.toString('base64')}`;

    const canvasData = await page.evaluate(
        `document.querySelector('canvas'/* TODO: Figure out better selector */).toDataURL();`,
    );

    // Note: canvasData is black empty image (probbablt Figma resist scraping)

    const whiteboard = WhiteboardFile.emptyBoard()

        //.pushAsset('screenshot.png', fullPageScreenshotBuffer /* TODO: This is a bit special type of asset */)
        .pushCommit({
            treeId: 1,
            commitId: 1,
            module: 'figjam' /* TODO: Unhardcode */,
            moduleVersion: '0.1.0' /* TODO: Unhardcode */,
            author: 'https://www.figma.com/files/user/678895466180590881' /* TODO: Get author from Figma, fluent API to create authors from multiple sources */,
            created: new Date(),
            data: {
                __class: 'Html',
                position: { x: 0, y: 0 }, // TODO: Vector.zero,
                size: { x: 1920, y: 1080 }, // TODO: new Vector(1920, 1080),
                html: `<img src="${fullPageData}"/>`,
                // Note: data will be automatically saved as asset
            },
        });

    await browser.close();

    return whiteboard;
}
