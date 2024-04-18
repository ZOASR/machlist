import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import fs from "fs/promises";

const { name, titleen, titlear, model, order, isLine } = yargs(
	hideBin(process.argv)
)
	.demand(["name", "titleen", "titlear", "model", "order"])
	.option("isLine", {
		demandOption: false
	})
	.parse();

const contentEn = `---
title: ${titleen}
model: ${model}
cover: "@assets/product_thumbs/${name}.jpg"
order: ${order}
isLine: ${isLine ? isLine : "false"}
nested: false
---
`;
const contentAr = `---
title: ${titlear}
model: ${model}
cover: "@assets/product_thumbs/${name}.jpg"
order: ${order}
isLine: ${isLine ? isLine : "false"}
nested: false
---
`;

const uriBase = `.`;

const machineBase = `${uriBase}/src/content/products`;
const assetsBase = `${uriBase}/src/assets`;
console.log(`${uriBase} | ${machineBase} | ${assetsBase}`);

const baseFileUrlEn = `${machineBase}/en/${name}.md`;
const baseFileUrlAr = `${machineBase}/ar/${name}.md`;

const thumbUrl = `${assetsBase}/product_thumbs/${name}.jpg`;
const articleUrl = `${assetsBase}/article_images/${name}/`;

const files = [thumbUrl, baseFileUrlAr, baseFileUrlEn];

const directories = [
	articleUrl,
	...Array.from(
		new Set(files.map((x) => x.split("/").slice(0, -1).join("/")))
	).filter((x) => x.includes(name))
];

(async function () {
	// make files and directories
	for (const dir of directories) {
		try {
			await fs.mkdir(dir, {
				recursive: true
			});
		} catch (err) {
			if (err.code !== "EEXIST") throw err;
		}
	}
	for (const file of files) {
		await fs.writeFile(file, "");
	}
	// write content
	await fs.writeFile(baseFileUrlAr, contentAr);
	await fs.writeFile(baseFileUrlEn, contentEn);
})();

// Usage :
// pnpm run create:old-machine --name=[name] --titleen=[titleen] --titlear=[titlear] --model=[model] --order=[order] --isLine=[isLine]
