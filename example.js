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