- [Machlist](#machlist)
	- [Building](#building)
		- [Branches](#branches)
		- [Merging changes between branches](#merging-changes-between-branches)
	- [Project Structure](#project-structure)
	- [Astro docs](#astro-docs)
	- [Commands](#commands)
	- [Ui](#ui)
		- [Tailwind](#tailwind)
		- [Sass](#sass)
		- [astro-icon](#astro-icon)
		- [AOS](#aos)
	- [Content Collection](#content-collection)
		- [Adding a product](#adding-a-product)
			- [`create:machine`:](#createmachine)
			- [`create:old-machine`:](#createold-machine)
		- [Rendering the collection](#rendering-the-collection)
	- [Internationalization (i18n)](#internationalization-i18n)
		- [Config](#config)
		- [UI strings](#ui-strings)
		- [Utilty functions](#utilty-functions)

# Machlist
This project uses pnpm as its package manager using it is recommended

```sh
pnpm i
```

> [!WARNING]
> If you you want to switch to another package manager just delete the [pnpm-lock.yaml](/pnpm-lock.yaml) then install with your favourite package manager



## Building

To build the site just run `pnpm run build` which will build the site to `./dist/` or `./.vercel` folder depending on the current git branch.

### Branches
- `main` - a branch that contains the vercel ssr integration
- `static` - a branch that contains the static config for building static html files

### Merging changes between branches

- merging from `main` to `static`:
-
```sh
pnpm run mergeto:static
```
- merging from `static` to `main`:
```sh
pnpm run mergeto:main
```

## Project Structure

Inside of this Astro project, you'll see the following folders and files:

```text
/
├── src/
│   ├───assets
│   ├───article_images
│   │   └───...				// images embedded inside every content page
│   └───product_thumbs // thumbnails for each product
├───components
│   ├───sections
│   └───svelte
├───content
│   │   config.ts //  content schema and config
│   └───products // contains all the markdown files for the content
│       ├───ar
│       └───en
├───i18n		// all internationalized strings and utility functions
│       ui.ts
│       utils.ts
├───js
│       aos.js
├───layouts
│       ContentLayout.astro
│       Layout.astro
│       SectionLayout.astro
├───pages
│   │   index.astro
│   ├───ar
│   │   │   index.astro
│   │   │
│   │   ├───about
│   │   │       index.astro
│   │   ├───contact
│   │   │       index.astro
│   │   └───products
│   │       │   index.astro
│   │       └───[...product]
│   │               index.astro
│   └───en
│       │   index.astro
│       ├───about
│       │       index.astro
│       ├───contact
│       │       index.astro
│       └───products
│           │   index.astro
│           └───[...product]
│                   index.astro
└───utils
        utils.ts
```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

There's nothing special about `src/components/`, but that's where we like to put any Astro/React/Vue/Svelte/Preact components.

Any static assets, like images, can be placed in the `public/` directory.

## Astro docs

Feel free to check [Astro's documentation](https://docs.astro.build)

## Commands

All commands are run from the root of the project, from a terminal:

| Command                       | Action                                                                                                                                                                                            | Usage                                                                                                                                 |
| :---------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------- |
| `pnpm install`                | Installs dependencies                                                                                                                                                                             |                                                                                                                                       |
| `pnpm run dev`                | Starts local dev server at `localhost:4321`                                                                                                                                                       |                                                                                                                                       |
| `pnpm run build`              | Build your production site to `"./dist/", ".vercel"`                                                                                                                                              |                                                                                                                                       |
| `pnpm run preview`            | Preview your build locally, before deploying                                                                                                                                                      |                                                                                                                                       |
| `pnpm run check`              | Check for linting and formatting errors before building                                                                                                                                           |                                                                                                                                       |
| `pnpm run astro ...`          | Run CLI commands like `astro add`, `astro check`                                                                                                                                                  |                                                                                                                                       |
| `pnpm run astro -- --help`    | Get help using the Astro CLI                                                                                                                                                                      |                                                                                                                                       |
| `pnpm run create:machine`     | Creates all the files necessary for a new product with nested routes (eg.: `catalog.mdx`, `design.mdx`, `...etc` ) and pages inside the `./src/content/products` & `./src/assets` folders         | `pnpm run create:machine --name=[name] --titleen=[titleen] --titlear=[titlear] --model=[model] --order=[order] --isLine=[isLine]`     |
| `pnpm run create:old-machine` | Creates all the files necessary for a new product (only `.md` files) inside the `./src/content/products` & `./src/assets` folders                                                                 | `pnpm run create:old-machine --name=[name] --titleen=[titleen] --titlear=[titlear] --model=[model] --order=[order] --isLine=[isLine]` |
| `pnpm run mergeto:main`       | Merges changes from `static` branch to `main` branch     |                                                                                                                                                                                                                                                                                                         |
| `pnpm run mergeto:static` | Merges changes from `main` branch to `static` branch  | |

## Ui

This Project uses the following frameworks and libraries for building the ui:

- Tailwind
- Sass
- astro-icon
- AOS
- Svelte
  - bits-ui

### Tailwind

The tailwind config uses an opinionated system of ui colors try to not go outside of using these colors as much as possible

```js
colors: {
    skin: {
    	primary: withOpacity("--color-primary"),
    	secondary: withOpacity("--color-secondary"),
    	neutral: withOpacity("--color-neutral"),
    	accent: withOpacity("--color-accent"),
    	"accent-1": withOpacity("--color-accent-1"),
    	"accent-2": withOpacity("--color-accent-2"),
    	"accent-3": withOpacity("--color-accent-3"),
    	purple: withOpacity("--color-purple"),
    	teal: withOpacity("--color-teal"),
    	magenta: withOpacity("--color-magenta"),
    	background: withOpacity("--color-background"),
    	base: withOpacity("--color-text-base"),
    	"text-dark": withOpacity("--color-text-dark"),
    	muted: withOpacity("--color-text-muted")
    }
}
```

you'll find these colors defined in [tailwind.config.mjs](./tailwind.config.mjs)
all these colors correspond to css variables defined inside the main [layout](./src/layouts/Layout.astro) component

```css
:root {
	--color-neutral: 0, 0%, 13%; /* hsl(0, 0%, 13%) */
	--color-primary: 213, 100%, 85%; /* hsl(213, 100%, 85%) */
	--color-secondary: 0, 0%, 30%; /* hsl(0, 0%, 30%) */
	--color-accent: 51, 100%, 50%; /* hsl(51, 80%, 50%) */
	--color-accent-1: 12, 100%, 50%; /* hsl(12, 100%, 50%) */
	--color-accent-2: 49, 90%, 40%; /* hsl(49, 90%, 50%) */
	--color-accent-3: 145, 63%, 49%; /* hsl(145, 63%, 49%) */
	--color-background: 0, 0%, 95%; /* hsl(0, 0%, 95%) */
	--color-purple: 277, 70%, 35%; /* hsl(277, 70%, 35%) */
	--color-teal: 180, 100%, 25%; /* hsl(180, 100%, 25%) */
	--color-magenta: 326, 100%, 50%; /* hsl(326, 100%, 50%) */
	--color-text-base: 213, 34%, 15%;
	--color-text-muted: var(--color-secondary);
}
```

### Sass

Using Sass inside an Astro component is as simple as:

```html
<style lang="scss">
	...
</style>
```


### astro-icon

[astro-icon](https://www.astroicon.dev/getting-started/) is a component for using icons in Astro projects.


You can utilize any icon inside the [Iconify icon collection](https://icon-sets.iconify.design/) in the form of:
```jsx
<Icon name="[icon-collection]:[icon-name]" />
```

> [!NOTE]
> You need to install the icon collection that you wanna use first by running `pnpm add @iconify-json/[icon-collection]`

> [!NOTE]
> This project already has these following icon collections installed: `ic`, `ri`, `radix-icons`


### AOS

[AOS](https://michalsnik.github.io/aos/) is a library for animating elements on scroll

- You'll find it used in the homepage to animate some sections
- You can learn more about how to use it [here](https://michalsnik.github.io/aos/)

To include it in your Astro project just add script with the following code:

```js
import AOS from 'aos';
import 'aos/dist/aos.css';
AOS.init();
```

this script is already configured inside [aos.js](./src/js/aos.js) and imported inside the pages layout, there is no need to do anything else.



## Content Collection

You'll find the config for the content collection in [src\content\config.ts](./src/content/config.ts).
there is only one collection for this project called `products`

### Adding a product

To add a new product to the collection `products` you can do it by running:
```sh
pnpm run create:machine ...
```
  or

```sh
pnpm run create:old-machine ...
```

#### `create:machine`:
by running the follwowing command:

```sh
pnpm run create:machine --name=example-name --titleen="Example name" --titlear="مثال" --model=ABCDE  --order=10 --isLine=false
```

This will create the following files inside the `./src/content/products` folder:

- `en`:
  - `./src/content/products/en/example-name.mdx`
  - `./src/content/products/en/example-name/catalog.mdx`
  - `./src/content/products/en/example-name/design.mdx`
  - `./src/content/products/en/example-name/gallery.mdx`
  - `./src/content/products/en/example-name/drawings.mdx`

- `ar`
  - `./src/content/products/ar/example-name.mdx`
  - `./src/content/products/ar/example-name/catalog.mdx`
  - `./src/content/products/ar/example-name/design.mdx`
  - `./src/content/products/ar/example-name/gallery.mdx`
  - `./src/content/products/ar/example-name/drawings.mdx`

- images folders:
  - `./src/assets/product_thumbs/example-name.jpg`
  - `./src/assets/article_images/example-name/`

> [!WARNING]
> The script creates `jpg` files but they have no actual data you'll have to replace them with your own of course otherwise astro will throw an error

Files contents:

`catalog.mdx`, `design.mdx`, `gallery.mdx` and `drawings.mdx` will have this content that matches the schema (note the nested flag is set to `true`):

```mdx
---
title: Example name
model: ABCDE
cover: "@assets/product_thumbs/example-name.jpg"
order: 10
isLine: false
nested: true
---
import ProductTabs from "@components/ProductTabs.astro";

<ProductTabs />
```

`example-name.mdx` will have this content that matches the schema (note the nested flag is set to `false`):

```mdx
---
title: Example name
model: ABCDE
cover: "@assets/product_thumbs/example-name.jpg"
order: 10
isLine: false
nested: false
---
import ProductTabs from "@components/ProductTabs.astro";

<ProductTabs />
```

#### `create:old-machine`:
by running the follwowing command:

```sh
pnpm run create:old-machine --name=example-name --titleen="Example name" --titlear="مثال" --model=ABCDE  --order=10 --isLine=false
```


This will create the following files inside the `./src/content/products` folder:

- `en`:
  - `./src/content/products/en/example-name.md`

- `ar`
  - `./src/content/products/ar/example-name.md`

- images folders:
  - `./src/assets/product_thumbs/example-name.jpg`
  - `./src/assets/article_images/example-name/`


Files contents:

`example-name.md` will have this content that matches the schema:

```md
---
title: Example name
model: ABCDE
cover: "@assets/product_thumbs/example-name.jpg"
order: 10
isLine: false
nested: false
---
```

### Rendering the collection

inside the path `[locale]/products/[locale]/[...product]`:

we will do the follwoing:


1. define a `getStaticPaths` function to generate all the pages for all of the files in the collection":
```js
export async function getStaticPaths() {
	const productEntries = await getCollection("products");
	return productEntries.map((entry) => ({
		params: { product: entry.slug }
	}));
}
```

2. get the parameter from the current path:

```js
const { product } = Astro.params;
```

3. we get the entry from the collection based on the parameter:
```js
const entry = await getEntry("products", product);
const { Content } = await entry.render();
```

4. render the content:
```jsx
<Layout title={entry.data.title}>
   <ProductHead />
	<article>
		<ContentLayout>
			<Content />
		</ContentLayout>
	</article>
</Layout>
```

> [!NOTE]
> The `<Content>` element is destructured from the `entry.render()` function


## Internationalization (i18n)


### Config

to define the locales for this project you can do it by changing the i18n config in [`astro.config.mjs`](./astro.config.mjs):

```js
export default defineConfig({
	// ...
	i18n: {
		defaultLocale: "ar",
		locales: ["en", "ar"],
		routing: {
			prefixDefaultLocale: true
		}
	}
});
```
the `prefixDefaultLocale` is used to prefix the current locale in the URL, which makes routing a bit easier to handle.

### UI strings
inside [@i18n/ui.ts](./src/i18n/ui.ts) you'll find the following:

```ts
export const languages = {
	en: "English",
	ar: "العربية"
};

export const defaultLang = "ar";

export const ui = {
	en: {
		// ...
	},
	ar: {
		// ...
	}
} as const;
```

the `ui` object is used to define the ui strings for each locale with keys for every ui string.
> [!NOTE]
> both `en` and `ar` objects need to have the same keys for the translation to work correctly.

### Utilty functions

- `getLangFromUrl()`:
  takes the current URL and returns the locale of the current page.
- `useTranslations()` :
  takes the locale and returns a function that can be used to translate strings.

you can import these functions anywhere even in astro islands, and they'll be typically like so:

```js
import { getLangFromUrl, useTranslations } from "@i18n/utils";

const locale = getLangFromUrl(Astro.url);
const t = useTranslations(locale);
```

> [!NOTE]
> the `Astro` object is only available inside `.astro` files. so you might want to pass the locale as a prop to any client component if you need access to translated ui strings inside that component.