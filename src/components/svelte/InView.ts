export default function inView(
	node: Element,
	params: { root?: Element | null } = { root: null }
) {
	let observer: IntersectionObserver;

	const handleIntersect = (e: IntersectionObserverEntry[]) => {
		const v = e[0].isIntersecting ? 'enter' : 'exit';
		node.dispatchEvent(new CustomEvent(v));
	};

	const setObserver = ({
		root = null
	}: {
		root?: Element | null;
		top?: number;
		bottom?: number;
	}): void => {
		const rootMargin = `0px 0px 0px 0px`;
		const options = { root, rootMargin, threshold: 0.8 };
		if (observer) observer.disconnect();
		observer = new IntersectionObserver(handleIntersect, options);
		observer.observe(node);
	};

	setObserver(params);

	return {
		update(params: { root?: Element | null }) {
			setObserver(params);
		},

		destroy() {
			if (observer) observer.disconnect();
		}
	};
}
