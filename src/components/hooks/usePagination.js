import { useState } from "react";

const chunk = (arr, size = 1) => {
	const a = arr || [];

	return Array(Math.ceil(a.length / size))
		.fill([])
		.map((e, inx) => a.slice(inx * size, inx * size + size));
};

const fillCleanItem = (size, countItems) =>
	countItems < size ? Array(size - countItems).fill("") : [];

export default function usePagination(size = 5) {
	const [pagination, setPagination] = useState({
		size,
		current: 1,
		itemsOnPage: [],
		count: 0,
		allItems: [],
	});

	/* const [currentPageSetting, setCurrentPage] = useState({
		current: 1,
		itemsOnPage: [],
	});

	const [allItemsSetting, setAllItems] = useState({
		allItems: [],
		count: 0,
	}); */

	const pageChangeHandler = (page) => {
		setPagination((pagination) => {
			const { allItems, size } = pagination;
			const itemsOnPage = allItems[page - 1] || allItems[0] || [];
			return {
				...pagination,
				current: page,
				itemsOnPage: [
					...itemsOnPage,
					...fillCleanItem(size, itemsOnPage.length),
				],
			};
		});
	};

	const setupPagination = (list) => {
		setPagination((pagination) => {
			const { size } = pagination;
			const allItems = chunk(list, size);

			return {
				...pagination,
				allItems,
				count: allItems.length,
			};
		});

		const { current } = pagination;
		pageChangeHandler(current);
	};

	return {
		itemsOnPage: pagination.itemsOnPage,
		pageChangeHandler,
		setupPagination,
	};
}
