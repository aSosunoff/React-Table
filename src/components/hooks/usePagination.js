import { useMemo, useState } from "react";

const chunk = (arr, size = 1) => {
	const a = arr || [];

	return Array(Math.ceil(a.length / size))
		.fill([])
		.map((e, inx) => a.slice(inx * size, inx * size + size));
};

const fillCleanItem = (size, countItems) =>
	countItems < size ? Array(size - countItems).fill("") : [];

const getItemsOnPage = (currentPage, chunkList) =>
	chunkList[currentPage - 1] || chunkList[0] || [];

export default function usePagination(size = 5, list) {
	const [currentPage, setCurrentPage] = useState(1);

	const chunkList = useMemo(() => {
		return chunk(list, size);
	}, [list, size]);

	const itemsOnPage = useMemo(() => {
		const itemsOnPage = getItemsOnPage(currentPage, chunkList);
		return [...itemsOnPage, ...fillCleanItem(size, itemsOnPage.length)];
	}, [size, currentPage, chunkList]);

	return {
		itemsOnPage,
		pageChangeHandler: setCurrentPage,
	};
}
