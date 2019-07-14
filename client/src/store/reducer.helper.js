export const swapElement = (list, x, y) => {
	const b = list[y];
	list[y] = list[x];
	list[x] = b;
	return list;
}
