#!/usr/bin/env node
const { download } = require("./index");

const input = process.argv.slice(2)[0];
if (!input) {
	console.log("Please provide a URL");
	process.exit(1);
}

download(input, true);
