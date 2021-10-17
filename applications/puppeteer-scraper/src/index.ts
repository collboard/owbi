import { writeFile } from 'fs/promises';
import { join } from 'path';
import { scrapeFigjam } from './scrapeFigjam';

main();

async function main() {
    const whiteboard = await scrapeFigjam(`https://www.figma.com/file/6a7xn9gzjgrhUS8ad2zNLH/Untitled`);

    await writeFile(
        join(process.cwd(), 'whiteboards', /*v4().split('-')[0]*/ '6a7xn9gzjgrhUS8ad2zNLH.html'),
        await whiteboard.toHtml(),
    );

    await writeFile(
        join(process.cwd(), 'whiteboards', /*v4().split('-')[0]*/ '6a7xn9gzjgrhUS8ad2zNLH.owb'),
        await whiteboard.toBuffer(),
    );

    console.info('Saved!');
    process.exit(0);

    // TODO: On error process.exit(1);

    // TODO: await (await whiteboard.toBlob()).stream()
}
