import Apify from 'apify';
import { locateChrome } from 'locate-app';

Apify.main(async () => {
    const requestQueue = await Apify.openRequestQueue();
    // Choose the first URL to open.
    await requestQueue.addRequest({ url: 'https://www.figma.com/file/6a7xn9gzjgrhUS8ad2zNLH/Untitled' });

    const crawler = new Apify.PuppeteerCrawler({
        requestQueue,
        launchContext: {
            launchOptions: {
                // TODO: !!! headless: false,
                executablePath: await locateChrome(),
                // TODO: !!! defaultViewport: null,
                //args: ['--proxy-server=socks5://127.0.0.1:9050']
            },
        },

        // Stop crawling after several pages
        maxRequestsPerCrawl: 50,

        // This function will be called for each URL to crawl.
        // Here you can write the Puppeteer scripts you are familiar with,
        // with the exception that browsers and pages are automatically managed by the Apify SDK.
        // The function accepts a single parameter, which is an object with the following fields:
        // - request: an instance of the Request class with information such as URL and HTTP method
        // - page: Puppeteer's Page object (see https://pptr.dev/#show=api-class-page)
        handlePageFunction: async ({ request, page }) => {
            console.log(`Processing ${request.url}...`);

            const screenshot = (await page.screenshot({ type: 'png', fullPage: true })) as Buffer;

            // Store the results to the default dataset.
            await Apify.pushData(screenshot);

            /*
            TODO: !!! How is this working?
            // Find a link to the next page and enqueue it if it exists.
            const infos = await Apify.utils.enqueueLinks({
                page,
                requestQueue,
                selector: '.morelink',
            });
            */
        },

        // This function is called if the page processing failed more than maxRequestRetries+1 times.
        handleFailedRequestFunction: async ({ request }) => {
            console.log(`Request ${request.url} failed too many times.`);
        },
    });

    await crawler.run();
});
