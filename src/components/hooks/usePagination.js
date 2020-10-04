import { useState } from "react";

const chunk = (arr, size = 1) => {
	const a = arr || [];

	return Array(Math.ceil(a.length / size))
		.fill([])
		.map((e, inx) => a.slice(inx * size, inx * size + size));
};

export default function usePagination(size) {
	const [pagination, setPagination] = useState({
		current: 1,
		size,
		count: 0,
		allItems: [],
		itemsOnPage: [],
	});

	const pageChangeHandler = (page) => {
		setPagination({
			...pagination,
			current: page,
			itemsOnPage:
				pagination.allItems[page - 1] || pagination.allItems[0] || [],
		});
	};

	const setupPagination = (pageAllItems) => {
		setPagination({
			...pagination,
			allItems: chunk(pageAllItems, pagination.size),
			count: pagination.allItems.length,
		});
		pageChangeHandler(pagination.current);
	};

	return {
		...pagination,
		pageChangeHandler,
		setupPagination,
	};
}
