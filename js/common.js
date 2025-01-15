export const debounce = function (func, delay = 300) {
	let timer;
	return function (...args) {
		if (timer) clearTimeout(timer);
		timer = setTimeout(() => {
			func(...args);
		}, delay);
	};
};
