import { writeFile } from 'fs/promises';
import { join } from 'path';
import { scrapeFigjam } from './scrapeFigjam';

main();

async function main() {
    const whiteboard = await scrapeFigjam(`https://www.figma.com/file/6a7xn9gzjgrhUS8ad2zNLH/Untitled`);
    console.log({ whiteboard });

    await writeFile(join(process.cwd(), '6a7xn9gzjgrhUS8ad2zNLH.png'), whiteboard);
}
