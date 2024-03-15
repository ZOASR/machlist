export type AnimationProps = {
	duration: number;
	delay?: number;
	easing: (t: number) => number;
	dir?: "right" | "left";
};
