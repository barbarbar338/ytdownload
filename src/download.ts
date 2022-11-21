import { createWriteStream, mkdir } from "fs";
import { clearLine, cursorTo } from "readline";
import { table } from "table";
import ytdl, { getInfo } from "ytdl-core";

export const downlaod = (url: string, logging = true): Promise<string> => {
	return new Promise((resolve, reject) => {
		mkdir("videos", (err) => {
			if (err && err.code !== "EEXIST")
				reject(
					`[YTDownload] ${err} \n\nFOR MORE ADVANCED HELP: https://discord.com/invite/BjEJFwh`,
				);
			getInfo(url)
				.then((info) => {
					const video = ytdl(info.videoDetails.video_url);
					const filePath = `./videos/${info.videoDetails.title.replace(
						/[\W_]+/g,
						" ",
					)}.mp4`;
					video.pipe(createWriteStream(filePath));
					if (logging) {
						const data = table([
							["YTDownload", "Status", "Percent"],
							[
								info.videoDetails.title,
								"Starting Download",
								"0%",
							],
						]);
						console.info(data);
					}
					video.on("end", () => {
						if (logging) {
							const data = table([
								["YTDownload", "Status", "Percent"],
								[
									info.videoDetails.title,
									"Download Finished",
									"100%",
								],
							]);
							console.log(`\n${data}`);
						}
						resolve(filePath);
					});
					video.on("error", (error) =>
						reject(
							`[YTDownload] ${error} \n\nFOR MORE ADVANCED HELP: https://discord.com/invite/BjEJFwh`,
						),
					);
					video.on("progress", (chunk, downloaded, total) => {
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
					reject(
						`[YTDownload] ${err} \n\nFOR MORE ADVANCED HELP: https://discord.com/invite/BjEJFwh`,
					),
				);
		});
	});
};
