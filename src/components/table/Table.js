import React, { useCallback, useEffect, useMemo, useState } from "react";
import Body from "./body/Body";
import Header from "./header/Header";
import styles from "./Table.module.css";
import Title from "./title/Title";
import sorting from "../../utils/sorting";
import usePagination from "../hooks/usePagination";
import TableContainer from "./tableContainer";
import cloneDeep from "lodash/cloneDeep";

const getStartOrderProp = (header) => {
	const firstHeaderByDirection = Object.entries(header).find(
		([, { order = null } = {}]) => order
	) || [null, { order: { direction: "asc" } }];

	const [
		prop,
		{
			order: { direction },
		},
	] = firstHeaderByDirection;

	return {
		prop,
		order: direction,
	};
};

const fillCleanItem = (size, countItems) =>
	countItems < size ? Array(size - countItems).fill("") : [];

const Table = ({
	list,
	header = {},
	/* btns = [], */
	title,
	/* custom = false, */
	pageSize,
	/* onOrderCustom = () => {}, */
}) => {
	const [page, setCurrentPage] = useState(1);
	// headOrder = { prop: id, order: 'asc' }
	const [headOrder, setHeadOrder] = useState(() => getStartOrderProp(header));

	const listLocalSorted = useMemo(() => {
		const { order: { type = null } = {} } = header[headOrder.prop] || {};
		return cloneDeep(list).sort((a, b) =>
			sorting(type, headOrder.order, a[headOrder.prop], b[headOrder.prop])
		);
	}, [headOrder.order, headOrder.prop, header, list]);

	const itemsOnPage = useMemo(() => {
		const itemsOnPage = listLocalSorted.slice(
			pageSize * (page - 1),
			pageSize * page
		);
		return [...itemsOnPage, ...fillCleanItem(pageSize, itemsOnPage.length)];
	}, [listLocalSorted, page, pageSize]);

	const onSortHandler = (prop) => {
		setHeadOrder({
			prop,
			order:
				headOrder.prop !== prop ||
				headOrder.order === "desc" ||
				!headOrder.order
					? "asc"
					: "desc",
		});
	};
	/* const memoizedList = useMemo(() => {
		console.log(1);
		return cloneDeep(list);
	}, [list]); */

	// const { itemsOnPage, setupPagination, pageChangeHandler } = usePagination(
	// 	pageSize
	// );

	// const [order, setOrder] = useState({ prop: null, order: null });
	// const [filter, setFilter] = useState({});

	// useEffect(() => {
	// 	if (!custom) {
	// 		setupPagination(getFilterList(getSortList(list)));
	// 	}
	// 	// eslint-disable-next-line react-hooks/exhaustive-deps
	// }, [list]);

	// const getSortList = useCallback(
	// 	(list, order = {}) => {
	// 		const { order: { type = null } = {} } = header[order.prop] || {};
	// 		const localList = cloneDeep(list);
	// 		return localList.sort((a, b) =>
	// 			sorting(type, order.order, a[order.prop], b[order.prop])
	// 		);
	// 	},
	// 	[header]
	// );

	// const getFilterList = useCallback(
	// 	(list) => {
	// 		return list.filter((item) =>
	// 			Object.entries(filter).reduce(
	// 				(res, [prop, { value }]) =>
	// 					res && !!String(item[prop]).match(new RegExp(`^${value}`, "i")),
	// 				true
	// 			)
	// 		);
	// 	},
	// 	[filter]
	// );

	// const onOrderHandler = useCallback(
	// 	({ prop, order }) => {
	// 		if (custom) {
	// 			onOrderCustom({ prop, order });
	// 		} else {
	// 			/* setOrder({ prop, order }); */
	// 			/* console.log(getSortList(list)); */
	// 			console.log({ prop, order });
	// 			setupPagination(getFilterList(getSortList(list, { prop, order })));
	// 		}
	// 	},
	// 	[getFilterList, getSortList, onOrderCustom, setupPagination, custom, list]
	// );

	return (
		<TableContainer header={header} /* btnsLength={btns.length} */>
			<Title title={title} />
			<Header header={header} order={headOrder} onOrder={onSortHandler} />
			<Body list={itemsOnPage} header={header} />
			<button
				onClick={() => {
					setCurrentPage(2);
				}}
			>
				2
			</button>
		</TableContainer>
	);
};

export default Table;
