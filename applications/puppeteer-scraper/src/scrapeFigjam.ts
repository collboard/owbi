import { locateChrome } from 'locate-app';
import puppeteer from 'puppeteer-core';
import { WhiteboardFile } from '../../file-parser/src/WhiteboardFile';

export async function scrapeFigjam(url: string): Promise<WhiteboardFile> {
    const browser = await puppeteer.launch({
        headless: false,
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

    await page.goto(url, { waitUntil: 'networkidle2' });
    const buffer = (await page.screenshot({ type: 'png', fullPage: true })) as Buffer;

    const whiteboard = WhiteboardFile.emptyBoard().pushCommit({
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
            html: `<img src="data:image/png;base64,${buffer.toString('base64')}"/>`,
            // Note: data will be automatically saved as asset
        },
    });

    await browser.close();

    return whiteboard;
}
