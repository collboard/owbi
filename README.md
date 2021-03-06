# `This project was drafted on hackathon. Expect a pure code quality, outdated dependencies and lot of unfinished work`

# βΎοΈ Open whiteboard initiative

OWBI is an initiative for standardizing the way how digital whiteboards exchange data.

This is proposal of version π `1.0.0` created by [Pavol HejnΓ½](https://pavolhejny.com), co-author of [online whiteboard Collboard](https://collboard.com).

![OWBI](./assets/wallpaper.crop.png)

## π±βπ€ HackPrague

This proposal is implemented with [multiple sample applications](/applications)) during the [HackPrague](https://www.hackprague.com/hackathon2021) hackathon. See the video:

https://youtu.be/PWjKxIvIOQM


## π΅ Roadmap

We want to be able to scrape data from every tool, but time is limited. Here is a list of our priorities and progress:

-   β°β°β°β° PNG, JPG, SVG images
-   β°β°β°β± Collboard
-   β°β°β±β± FigJam
-   β°β±β±β± Microsoft whiteboard
-   β°β±β±β± Google Jamboard
-   β°β±β±β± Google draw
-   β°β±β±β± PDFs
-   β°β±β±β± DOC(X), DOCX(X)
-   β±β±β±β± AWWApp
-   β±β±β±β± SeeSaw
-   β±β±β±β± ZiteBoard
-   β±β±β±β± Miro
-   β±β±β±β± OpenBoard
-   β±β±β±β± Trello
-   β°β±β±β± Any online tool

_Note: We will be happy to receive ideas & pull requests._

# π Whitepaper

Our goal is to capture all **essential features of the whiteboards**. They at the first glance seem to be similar to images or documents but they are specific.

-   Enable to extend the format with new features specific to each platform but still be able to use some basic common features
-   Support for infinitely large whiteboards
-   Support of both vector and raster graphics
-   Keep information on who and when created the board
-   Preserve history
-   Decentralize & distribute the storage of the whiteboards

## π File for offline use

We [describe here](/applications/file-parser/src/WhiteboardFile.ts) `.OWB` file extension as universal whiteboard format.

<!--TODO: Describe it-->

## π API for real-time interaction

We describe here the protocol for real-time communication & federation between users and whiteboards.
This is implemented by Socket.io API and [Superface OneSDK](https://superface.ai/).
