YTDownload: Download YouTube videos easily I guess
======

<p><b>YTDownload</b> allows you to download youtube videos easily and has several functions to manage downloaded videos</p>
<p>Love you <b>ytdl-core</b></p>

<b>[Discord: https://discord.com/invite/BjEJFwh](https://discord.com/invite/BjEJFwh)</b>
-------

<b>[NPM Page](https://www.npmjs.com/package/ytdownload) [GITHUB Page](https://github.com/barbarbar338/ytdownload)</b>
-------

Usage
------------
<p>Here is a simple but effective example!</p>

```js
/* YTDownload Packages */
const ytdownload = require("ytdownload");

/* Downloading progress
 * You can follow there steps to download a video
 */
ytdownload.directDownload('http://www.youtube.com/watch?v=A02s8omM_hI').then(buffer => {
    console.log(buffer);
});
```

<p>Isn't it so simple? Let's examine it in a little more detail now</p>

```js
/* YTDownload Packages */
const ytdownload = require("ytdownload");

/* logging = option
 * Sets the console log setting for transactions
 *
 *          option          loggin option, boolean
 */
ytdownload.logging = true;

/* getVideoInformation('URL')
 * Returns: Promise <Information about specified YouTube video URL>
 *
 *          URL          YouTube URL, string
 */
ytdownload.getVideoInformation('http://www.youtube.com/watch?v=A02s8omM_hI').then(info => {
   console.info(info);
});

/* downloadVideo(INFO)
 * Returns: ?Promise <Downloads video from given information (returns video path)>
 *
 *          INFO         ytdl-core / ytdownload info object, object
 */
ytdownload.downloadVideo(info).then(path => {
    /* These lines are not required. If you just want to download video
     * use downloadVideo(INFO) othervise use function as a normal promise object
     * (.then or async await)
     */
    console.info(path);
});

/* bufferFromPath('PATH')
 * Returns: Promise <Returns buffer from specified file path>
 *
 *          PATH        file path, string
 */
ytdownload.bufferFromPath(path).then(buffer => {
    console.log(buffer);
});

/* directDownload('URL')
 * Returns: ?Promise <Downloads specified video and returns video's buffer>
 *
 *          URL         YouTube URL, string
 */
ytdownload.directDownload('http://www.youtube.com/watch?v=A02s8omM_hI').then(buffer => {
    /* These lines are not required. If you just want to download video
     * use directDownload('URL') othervise use function as a normal promise object
     * (.then or async await)
     */
    console.log(buffer);
});

/* Downloading progress
 * You can follow there steps to download a video
 */
ytdownload.getVideoInformation('http://www.youtube.com/watch?v=A02s8omM_hI').then(info => {
    ytdownload.downloadVideo(info).then(path => {
        ytdownload.bufferFromPath(path).then(buffer => {
            console.log(buffer);
        });
    });
});

/* Or you can try just this */
ytdownload.directDownload('http://www.youtube.com/watch?v=A02s8omM_hI').then(buffer => {
    console.log(buffer);
});
```

<p>It looks so scary right :D Don't worry you dont have to use all of these xd</p>

[Contact Me For More Help](https://www.is-my.fun/ulas)
-------------------

\ ゜o゜)ノ