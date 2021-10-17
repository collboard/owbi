import { writeFile } from 'fs/promises';
import { join } from 'path';
import { scrapeFigjam } from './scrapeFigjam';

main();

async function main() {
    const figmaUrl = process.argv[2];
    const resultPath = join(process.cwd(), process.argv[3]);

    const whiteboard = await scrapeFigjam(figmaUrl);

    await writeFile(`${resultPath}.html`, await whiteboard.toHtml());
    await writeFile(`${resultPath}.owb`, await whiteboard.toBuffer());

    console.info(['Created:', `${resultPath}.html`, `${resultPath}.owb`].join('\n'));
    process.exit(0);

    // TODO: On error process.exit(1);
    // TODO: await (await whiteboard.toBlob()).stream()
}
