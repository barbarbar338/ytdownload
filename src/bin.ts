#!/usr/bin/env node
import { downlaod } from "./download";

const input = process.argv.slice(2)[0];
if (!input) {
	console.log("Please provide a URL");
	process.exit(1);
}

async function main() {
	console.time("Downloaded in");
	const path = await downlaod(input);
	console.timeEnd("Downloaded in");
	console.log(`Downloaded to ${path}`);
}

main();
