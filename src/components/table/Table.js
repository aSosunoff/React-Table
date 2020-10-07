import React, { useEffect, useState } from "react";
import Body from "./body/Body";
import Header from "./header/Header";
import styles from "./Table.module.css";
import Title from "./title/Title";
import sorting from "../../utils/sorting";
import usePagination from "../hooks/usePagination";
import TableContainer from "./tableContainer";

const Table = ({
	list,
	header = {},
	btns = [],
	title,
	custom = false,
	pageSize,
	onOrderCustom = () => {},
}) => {
	const { itemsOnPage, setupPagination, pageChangeHandler } = usePagination(
		pageSize
	);

	const [order, setOrder] = useState({ prop: null, order: null });
	const [filter, setFilter] = useState({});

	useEffect(() => {
		const getSortList = (list) => {
			const { order: { type = null } = {} } = header[order.prop] || {};
			return list.sort((a, b) =>
				sorting(type, order.order, a[order.prop], b[order.prop])
			);
		};

		const getFilterList = (list) => {
			return list.filter((item) =>
				Object.entries(filter).reduce(
					(res, [prop, { value }]) =>
						res && !!String(item[prop]).match(new RegExp(`^${value}`, "i")),
					true
				)
			);
		};

		if (!custom) {
			setupPagination(getFilterList(getSortList(list)));
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const onOrderHandler = ({ prop, order }) => {
		custom ? onOrderCustom({ prop, order }) : setOrder({ prop, order });
	};

	return (
		<TableContainer header={header} btnsLength={btns.length}>
			<Title title={title} />
			<Header header={header} onOrder={onOrderHandler} />
			<Body list={itemsOnPage} header={header} />
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
