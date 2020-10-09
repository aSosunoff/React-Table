import { useMemo, useState } from "react";

const chunk = (arr, size = 1) => {
	const a = arr || [];

	return Array(Math.ceil(a.length / size))
		.fill([])
		.map((_, inx) => a.slice(inx * size, inx * size + size));
};

const getItemsOnPage = (currentPage, chunkList) =>
	chunkList[currentPage - 1] || chunkList[0] || [];

export default function usePagination(size = 5, list) {
	const [currentPage, setPageHandler] = useState(1);

	const chunkList = useMemo(() => chunk(list, size), [list, size]);

	const pageCount = useMemo(() => chunkList.length, [chunkList]);

	const itemsOnPage = useMemo(() => getItemsOnPage(currentPage, chunkList), [
		currentPage,
		chunkList,
	]);

	return {
		itemsOnPage,
		currentPage,
		pageCount,
		setPageHandler,
	};
}
