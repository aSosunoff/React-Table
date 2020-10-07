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

const Table = ({
	list,
	header = {},
	/* btns = [], */
	title,
	/* custom = false, */
	pageSize,
	/* onOrderCustom = () => {}, */
}) => {
	// headOrder = { prop: id, order: 'asc' }
	const [headOrder, setHeadOrder] = useState(() => getStartOrderProp(header));

	const listLocalSorted = useMemo(() => {
		console.log(1);
		const { order: { type = null } = {} } = header[headOrder.prop] || {};
		return cloneDeep(list).sort((a, b) =>
			sorting(type, headOrder.order, a[headOrder.prop], b[headOrder.prop])
		);
	}, [headOrder.order, headOrder.prop, header, list]);

	const { itemsOnPage, pageChangeHandler } = usePagination(
		pageSize,
		listLocalSorted
	);

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

	return (
		<TableContainer header={header} /* btnsLength={btns.length} */>
			<Title title={title} />
			<Header header={header} order={headOrder} onOrder={onSortHandler} />
			<Body list={itemsOnPage} header={header} />
			<button
				onClick={() => {
					pageChangeHandler(1);
				}}
			>
				1
			</button>
			<button
				onClick={() => {
					pageChangeHandler(2);
				}}
			>
				2
			</button>
		</TableContainer>
	);
};

export default Table;
