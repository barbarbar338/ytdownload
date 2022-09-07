# Download YouTube Videos Easily

<b>YTDownload</b> allows you to download youtube videos easily. Now with CLI support!

## Usage [CLI]

```bash
$ ytdownload <video_url>
```

example:

```bash
$ ytdownload https://www.youtube.com/watch?v=dQw4w9WgXcQ
```

## Usage [Code]

```js
/* ES6 */
import { download } from "ytdownload";

/* CommonJS*/
const { download } = require("ytdownload");

download("video_url");

// example
download("https://www.youtube.com/watch?v=dQw4w9WgXcQ").then((VideoPath) => {
	console.log(VideoPath); // => ./videos/Rick Astley - Never Gonna Give You Up (Video).mp4
});
```

[Contact Me For More Help](https://338.rocks/discord)
