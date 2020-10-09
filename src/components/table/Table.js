import React, { useCallback, useMemo, useState } from "react";
import { v4 } from "uuid";
import Body from "./body/Body";
import Header from "./header/Header";
/* import styles from "./Table.module.css"; */
import Title from "./title/Title";
import sorting from "../../utils/sorting";
import usePagination from "../hooks/usePagination";
import TableContainer from "./tableContainer";
import cloneDeep from "lodash/cloneDeep";
import BottomBar from "./bottomBar/BottomBar";

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
	list = [],
	header = {},
	/* NAME_PROPERTY: {
			titleHead: String,
			titleCell: Boolean | Function(value, record) : String,
			order: Object, // { type: 'string|number|date', direction: 'asc|desc'} | true
			width: Number,
			format: Function(value, record) : String,
			formatHTML: Function(value, record) : String,
			filter: {
				{
					type: 'list',
					items: Array, // [{id, text}],
					detail: Object, // custom
				}
				OR
				{
					type: 'text',
					detail: Object, // custom
				}
				OR
				{
					type: 'button',
					icon: String,
					handler: Function(callback(value), elementHTML),
					detail: Object, // custom
				}
			}
			cssClass: Function(value, record) : String,
			clickHandler: Function(value, record),
			btns: [{
				handler: Function(record, elementHTML),
				icon: String,
				disabled: Boolean | Function(record) : Boolean,
				title: String,
			} OR , Function(record) : Object]
		}
	*/
	rowsBtn = [],
	title,
	/* custom = false, */
	pageSize,
	/* onOrderCustom = () => {}, */
	controlPanel = [],
}) => {
	// НУЖНО ЛИ ВСЁ МЕМОИЗИРОВАТЬ
	const localList = useMemo(
		() =>
			cloneDeep(list).map((record) => ({
				uuid: v4(),
				...record,
			})),
		[list]
	);

	const localHeader = useMemo(() => cloneDeep(header), [header]);

	// headOrder = { prop: id, order: 'asc' }
	const [headOrder, setHeadOrder] = useState(() =>
		getStartOrderProp(localHeader)
	);

	const listLocalSorted = useMemo(() => {
		const { prop, order } = headOrder;

		const sortingType = localHeader[prop]?.order.type;

		return cloneDeep(localList).sort((a, b) =>
			sorting(sortingType, order, a[prop], b[prop])
		);
	}, [headOrder, localHeader, localList]);

	const { itemsOnPage, currentPage, pageCount, setPageHandler } = usePagination(
		pageSize,
		listLocalSorted
	);

	const itemsOnPageWithClanRow = useMemo(() => {
		return [
			...itemsOnPage,
			...fillCleanItem(pageSize, itemsOnPage.length).map((record) => ({
				uuid: v4(),
				...record,
			})),
		];
	}, [pageSize, itemsOnPage]);

	const onSortHandler = useCallback(
		(prop) => {
			setHeadOrder({
				prop,
				order:
					headOrder.prop !== prop ||
					headOrder.order === "desc" ||
					!headOrder.order
						? "asc"
						: "desc",
			});
		},
		[headOrder.order, headOrder.prop]
	);

	return (
		<>
			<TableContainer header={localHeader} rowsBtnLength={rowsBtn.length}>
				<Title title={title} />
				<Header
					header={localHeader}
					order={headOrder}
					onOrder={onSortHandler}
				/>
				<Body
					list={itemsOnPageWithClanRow}
					header={localHeader}
					rowsBtn={rowsBtn}
				/>
			</TableContainer>

			<BottomBar
				pageCount={pageCount}
				pageCurrent={currentPage}
				setPageHandler={setPageHandler}
				controlPanel={controlPanel}
			/>
		</>
	);
};

export default Table;
