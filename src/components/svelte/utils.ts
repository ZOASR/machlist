import type { GetImageResult } from "astro";

export type AnimationProps = {
	duration: number;
	delay?: number;
	easing: (t: number) => number;
	dir?: "right" | "left";
};

export type Product = {
	slug: string;
	data: ProductData;
};

export type ProductData = {
	title: string;
	cover: GetImageResult;
	production_rate?: number;
	model?: string;
	order: number;
	production_unit?:
		| "Kg/h"
		| "m/min"
		| "pieces/min"
		| "كغ/ساعة"
		| "متر/دقيقة"
		| "قطعة/دقيقة"
		| undefined;
	nested?: boolean;
	isLine?: boolean;
};

export type uiObject = {
	en: {
		[key: string]: string;
	};
	ar: {
		[key: string]: string;
	};
};

export const fadeAndScale = (
	node: Element,
	{
		duration,
		delay,
		easing
	}: {
		duration: number;
		delay?: number;
		easing: (t: number) => number;
	}
) => {
	return {
		delay,
		duration,
		css: (t: number) => {
			const eased = easing(t);
			return `
					transform-origin: 50% 0%;
					transform: scaleY(${eased});
					opacity: ${eased};
					mask-image: linear-gradient(45deg, rgba(0,0,0,0) ${(1 - eased - 0.1) * 100}%, rgba(0,0,0,1) ${(1 - eased + 0.1) * 100}%)
					`;
		}
	};
};
