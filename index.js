const { createWriteStream, mkdir } = require("fs");
const { clearLine, cursorTo } = require("readline");
const ytdl = require("ytdl-core");

const error_string =
	"[YTDownload] ${error} \n\nFOR MORE ADVANCED HELP: https://338.rocks/discord";

/**
 *
 * @param {string} url
 * @param {boolean} logging
 * @returns {Promise<string>}
 */
const download = (url, logging = true) => {
	return new Promise((resolve, reject) => {
		mkdir("videos", (err) => {
			if (err && err.code !== "EEXIST")
				reject(error_string.replace(/${error}/gim, err.message));
			ytdl.getInfo(url)
				.then((info) => {
					const video = ytdl(info.videoDetails.video_url);
					const filePath = `./videos/${info.videoDetails.title.replace(
						/[\W_]+/g,
						" ",
					)}.mp4`;
					video.pipe(createWriteStream(filePath));
					if (logging) {
						console.time("[YTDownload] Downloaded in");
						console.info(
							`[YTDownload] Starting to download: ${info.videoDetails.title}`,
						);
					}
					video.on("end", () => {
						if (logging) {
							console.info(
								`\n[YTDownload] Download finished: ${info.videoDetails.title}`,
							);
							console.timeEnd("[YTDownload] Downloaded in");
							console.log(
								`[YTDownload] Downloaded to ${filePath}`,
							);
						}
						resolve(filePath);
					});
					video.on("error", (error) =>
						reject(
							error_string.replace(/${error}/gim, error.message),
						),
					);
					video.on("progress", (_, downloaded, total) => {
						if (logging) {
							const percent = (
								(downloaded * 100) /
								total
							).toFixed(3);
							clearLine(process.stdout, 0);
							cursorTo(process.stdout, 0);
							process.stdout.write(
								`[YTDownload] Downloading ${percent}%`,
							);
						}
					});
				})
				.catch((err) =>
					reject(error_string.replace(/${error}/gim, err.message)),
				);
		});
	});
};

module.exports = {
	download,
};
