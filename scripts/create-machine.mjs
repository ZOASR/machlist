//  usage :  node scripts/create-machine.mjs [name] [titleen] [titlear] [model] [order] [isLine]
import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import fs from "fs/promises";

const { name, titleen, titlear, model, order, isLine } = yargs(
	hideBin(process.argv)
)
	.demand(["name", "titleen", "titlear", "model", "order", "isLine"])
	.parse();

const contentEn = `---
title: ${titleen}
model: ${model}
cover: "@assets/product_thumbs/${name}.jpg"
order: ${order}
isLine: ${isLine}
nested: false
---
import ProductTabs from "@components/ProductTabs.astro";

<ProductTabs />
`;
const contentAr = `---
title: ${titlear}
model: ${model}
cover: "@assets/product_thumbs/${name}.jpg"
order: ${order}
isLine: ${isLine}
nested: false
---
import ProductTabs from "@components/ProductTabs.astro";

<ProductTabs />
`;
const contentNestedEn = `---
title: ${titleen}
model: ${model}
cover: "@assets/product_thumbs/${name}.jpg"
order: ${order}
isLine: ${isLine}
nested: true
---

import ProductTabs from "@components/ProductTabs.astro";

<ProductTabs />
`;
const contentNestedAr = `---
title: ${titlear}
model: ${model}
cover: "@assets/product_thumbs/${name}.jpg"
order: ${order}
isLine: ${isLine}
nested: true
---

import ProductTabs from "@components/ProductTabs.astro";

<ProductTabs />
`;

const uriBase = `.`;

const machineBase = `${uriBase}/src/content/products`;
const assetsBase = `${uriBase}/src/assets`;
console.log(`${uriBase} | ${machineBase} | ${assetsBase}`); // just handy to check on progress

const slugs = ["catalog", "design", "gallery", "drawings"];
const contentBaseUrlsEn = slugs.map((slug) => {
	return `${machineBase}/en/${name}/${slug}.mdx`;
});
const contentBaseUrlsAr = slugs.map((slug) => {
	return `${machineBase}/ar/${name}/${slug}.mdx`;
});
const baseFilesUrlEn = `${machineBase}/en/${name}.mdx`;
const baseFilesUrlAr = `${machineBase}/ar/${name}.mdx`;

const thumbUrl = `${assetsBase}/product_thumbs/${name}.jpg`;
const articleUrl = `${assetsBase}/article_images/${name}/`;

const files = [
	...contentBaseUrlsAr,
	...contentBaseUrlsEn,
	thumbUrl,
	articleUrl,
	baseFilesUrlAr,
	baseFilesUrlEn
];

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

(async function () {
	for (const file of files) {
		try {
			await fs.mkdir(file.split("/").slice(0, -1).join("/"), {
				recursive: true
			});
		} catch (error) {
			if (err.code !== "EEXIST") throw err;
		}
	}
	for (const file of files) {
		await fs.writeFile(file, "");
	}
	await sleep(5000);
	for (const file of files) {
		await fs.unlink(file);
	}
})();
