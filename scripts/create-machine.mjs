//  usage :  node scripts/create-machine.mjs [name] [titleen] [titlear] [model] [order] [isLine]
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
import ProductTabs from "@components/ProductTabs.astro";

<ProductTabs />
`;
const contentAr = `---
title: ${titlear}
model: ${model}
cover: "@assets/product_thumbs/${name}.jpg"
order: ${order}
isLine: ${isLine ? isLine : "false"}
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
isLine: ${isLine ? isLine : "false"}
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
isLine: ${isLine ? isLine : "false"}
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
	baseFilesUrlAr,
	baseFilesUrlEn
];

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
		} catch (error) {
			if (err.code !== "EEXIST") throw err;
		}
	}
	for (const file of files) {
		await fs.writeFile(file, "");
	}

	// write content
	for (const file of contentBaseUrlsAr) {
		await fs.writeFile(file, contentNestedAr);
	}
	for (const file of contentBaseUrlsEn) {
		await fs.writeFile(file, contentNestedEn);
	}
	await fs.writeFile(baseFilesUrlAr, contentAr);
	await fs.writeFile(baseFilesUrlEn, contentEn);
})();

// Usage :
// pnpm run create:machine -- --name=[name] --titleen=[titleen] --titlear=[titlear] --model=[model] --order=[order] --isLine=[isLine]
