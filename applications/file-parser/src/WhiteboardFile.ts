import JSZip from 'jszip';
import { ICommit } from './interfaces/ICommit';

type IDataType = { __class: string; [a: string]: any };

export class WhiteboardFile {
    public static emptyBoard(): WhiteboardFile {
        return new this();
    }

    private commits: ICommit<IDataType>[] = [];
    private assets: Array<{ path: string; content: string | Blob | Buffer }> = [];

    private constructor() {}

    public pushAsset(path: string, content: string | Blob | Buffer): this {
        // TODO: Check conflicts with previous assets
        // TODO: Optimize images
        // TODO: Make list of supported mime types
        // TODO: Check all assets are used
        this.assets.push({ path, content });
        return this;
    }

    public pushCommit(...commits: ICommit<IDataType>[]): this {
        // TODO: Check compatibility with previous commits
        // TODO: Check all referenced assets exist
        // TODO: Assets exist move to folder assers and change it in the commit
        // TODO: Convert all base64url to propper assets
        this.commits.push(...commits);
        return this;
    }

    public async toHtml() {
        // TODO: Inherit lang="en" dir="ltr"
        // TODO: title
        // TODO: Spacetrim
        return `
                <!DOCTYPE html>
                <html lang="en" dir="ltr">
                <head>
                    <meta charset="UTF-8">
                    <title>OWBI file</title>
                </head>
                <body>
                    ${this.commits
                        .map(({ data }) => {
                            if (data.__class === 'Html') {
                                return data.html;
                            } else {
                                return `<!-- Unknown art ${data.__class} -->`;
                            }
                            // TODO: ArtShell for correct positioning
                            // TODO: Convert to html and set some standart set of supported classes
                        })
                        .join('\n')}
                </body>
                </html>
            `;
    }

    // TODO: public async toBlob(): Promise<Blob> {

    public async toBuffer(): Promise<Buffer> {
        // TODO: Compact vs. uncompact version

        const zipArchive = new JSZip();
        zipArchive.file('index.json', JSON.stringify(this.commits, null, 4));
        zipArchive.file('index.html', await this.toHtml());

        const assetsFolder = zipArchive.folder('assets');

        if (!assetsFolder) {
            throw new Error('WhiteboardFile internal error');
        }

        for (const { path, content } of this.assets) {
            assetsFolder.file(path, content);
        }

        return await zipArchive.generateAsync({ type: 'nodebuffer' });
    }

    // TODO: toImage, toPdf, toSvg, toGltf
}

// TODO: push asset by path or url
// TODO: Sanitize asset name
// TODO: Sanitize IDs
// TODO: Immutable
// TODO: Allow to create operation and make commits with fluent API
