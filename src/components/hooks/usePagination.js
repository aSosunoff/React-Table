import { useState } from "react";

const chunk = (arr, size = 1) => {
	const a = arr || [];

	return Array(Math.ceil(a.length / size))
		.fill([])
		.map((e, inx) => a.slice(inx * size, inx * size + size));
};

export default function usePagination(value) {
	const [size, setSize] = useState(5);

	const [pagination, setPagination] = useState({
		current: 1,
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
			allItems: chunk(pageAllItems, size),
			count: pagination.allItems.length,
		});
		pageChangeHandler(pagination.current);
	};

	return {
		current: 1,
		size: 5,
		count: 0,
		allItems: [],
		itemsOnPage: [],
		pageChangeHandler,
		setupPagination,
		setSize,
	};
}
