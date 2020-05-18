const { mkdirSync, readFile, createWriteStream }    = require('fs');
const { table }                                     = require('table');
const ytdl                                          = require('ytdl-core');
const { clearLine, cursorTo }                       = require('readline');
this.logging                                        = true;

try {
    mkdirSync("videos")
} catch (err) {
    if (err.code !== 'EEXIST') throw new Error(`[YTDownload] ${err} \n\nFOR MORE ADVANCED HELP: https://discord.com/invite/BjEJFwh`);
}

module.exports.getVideoInformation = url => {
    return new Promise((resolve, reject) => {
        try {
            ytdl.getInfo(url, (error, info) => {
                if (error) reject(`[YTDownload] ${error} \n\nFOR MORE ADVANCED HELP: https://discord.com/invite/BjEJFwh`);
                resolve(info);
            });
        } catch (err) {
            reject(`[YTDownload] ${err} \n\nFOR MORE ADVANCED HELP: https://discord.com/invite/BjEJFwh`);
        }
    });
}

module.exports.downloadVideo = info => {
    return new Promise((resolve, reject) => {
        try {
            let video = ytdl(info.video_url);
            let filePath = `./videos/${info.title.replace(/[^\x00-\x7F]/g, "")}.mp4`
            video.pipe(createWriteStream(filePath));
            if (this.logging) {
                let data = table([
                    [ 'YTDownload', 'Status', 'Percent' ],
                    [ info.title, 'Starting Download', '0%' ] 
                ]);
                console.log(data);
            }
            video.on('end', () => {
                if (this.logging) {
                    let data = table([
                        [ 'YTDownload', 'Status', 'Percent' ],
                        [ info.title, 'Download Finished', '100%' ] 
                    ]);
                    console.log(`\n${data}`);
                }
                resolve(filePath);
            });
            video.on('error', error => {
                reject(`[YTDownload] ${error} \n\nFOR MORE ADVANCED HELP: https://discord.com/invite/BjEJFwh`);
            });
            video.on('progress', (chunk, downloaded, total) => {
                if (this.logging) {
                    let percent = ((downloaded * 100) / total).toFixed(3);
                    updateConsole(`[YTDownload] Downloading ${percent}%`);
                }
            });
        } catch (err) {
            reject(`[YTDownload] ${err} \n\nFOR MORE ADVANCED HELP: https://discord.com/invite/BjEJFwh`);
        }
    });
}

module.exports.bufferFromPath = path => {
    return new Promise((resolve, reject) => {
        try {
            readFile(path, (err, buffer) => {
                if (err) reject(`[YTDownload] ${err} \n\nFOR MORE ADVANCED HELP: https://discord.com/invite/BjEJFwh`);
                resolve(buffer);
            });
        } catch (err) {
            reject(`[YTDownload] ${err} \n\nFOR MORE ADVANCED HELP: https://discord.com/invite/BjEJFwh`);
        }
    });
}

module.exports.directDownload = url => {
    return new Promise((resolve, reject) => {
        try {
            this.getVideoInformation(url).then(info => {
                this.downloadVideo(info).then(filePath => {
                    this.bufferFromPath(filePath).then(buffer => {
                        resolve(buffer);
                    });
                }).catch(err => {
                    reject(`[YTDownload] ${err} \n\nFOR MORE ADVANCED HELP: https://discord.com/invite/BjEJFwh`);
                });
            }).catch(err => {
                reject(`[YTDownload] ${err} \n\nFOR MORE ADVANCED HELP: https://discord.com/invite/BjEJFwh`);
            });
        } catch (err) {
            reject(`[YTDownload] ${err} \n\nFOR MORE ADVANCED HELP: https://discord.com/invite/BjEJFwh`);
        }
    });
}

function updateConsole(message) {
    try {
        clearLine(process.stdout);
        cursorTo(process.stdout, 0);
        process.stdout.write(message);
    } catch (err) {
        throw new Error(`[YTDownload] ${err} \n\nFOR MORE ADVANCED HELP: https://discord.com/invite/BjEJFwh`)
    }
}