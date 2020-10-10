import React, { useCallback, useMemo, useState } from "react";
import { v4 } from "uuid";
import Body from "./body/Body";
import Header from "./header/Header";
/* import styles from "./Table.module.css"; */
import Title from "./title/Title";
import TableContainer from "./tableContainer";
import cloneDeep from "lodash/cloneDeep";
import BottomBar from "./bottomBar/BottomBar";
import { usePagination } from "../hooks/usePagination";
import { useSorting } from "../hooks/useSortable";
import { useCleanRecord } from "../hooks/useCleanRecord";
import { useOrder } from "../hooks/useOrder";

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

	return [prop, direction];
};

const Table = ({
	title, // String
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
	/* custom = false, */
	pageSize,
	/* onOrderCustom = () => {}, */
	controlPanel = [],
	onRowClick = () => {},
	onUnselectRecord = () => {},
}) => {
	const [selectedRowId, setSelectedRowId] = useState(0);

	// TODO: НУЖНО ЛИ ВСЁ МЕМОИЗИРОВАТЬ
	const localList = useMemo(
		() =>
			cloneDeep(list).map((record) => ({
				uuid: v4(),
				...record,
			})),
		[list]
	);

	const memoizedHeader = useMemo(() => cloneDeep(header), [header]);

	const { prop, direction, sortHandler } = useOrder(
		...getStartOrderProp(memoizedHeader)
	);

	const listLocalSorted = useSorting(
		localList,
		prop,
		direction,
		memoizedHeader[prop]?.order.type
	);

	const { itemsOnPage, currentPage, pageCount, setPageHandler } = usePagination(
		pageSize,
		listLocalSorted
	);

	const itemsOnPageWithClanRow = useCleanRecord(itemsOnPage, pageSize);

	const rowClickHandler = useCallback(
		(indexRecord, record) => {
			if (selectedRowId !== indexRecord && indexRecord !== null) {
				onRowClick(record);
			} else if (selectedRowId === null) {
				onUnselectRecord();
			}
			setSelectedRowId(indexRecord);
		},
		[onRowClick, onUnselectRecord, selectedRowId]
	);

	return (
		<div>
			<TableContainer header={memoizedHeader} rowsBtnLength={rowsBtn.length}>
				<Title>{title}</Title>

				<Header
					header={memoizedHeader}
					prop={prop}
					direction={direction}
					onOrder={sortHandler}
				/>
				
				<Body
					list={itemsOnPageWithClanRow}
					header={memoizedHeader}
					rowsBtn={rowsBtn}
					onRowClick={rowClickHandler}
				/>
			</TableContainer>

			<BottomBar
				pageCount={pageCount}
				pageCurrent={currentPage}
				setPageHandler={setPageHandler}
				controlPanel={controlPanel}
			/>
		</div>
	);
};

export default Table;
