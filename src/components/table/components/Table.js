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
	rowCssClass, // Function(record) : String,
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
			cssClass: Function(value, key, record) : String,
			clickHandler: Function(value, record),
			btns: [{
				handler: Function(record, elementHTML),
				icon: String,
				disabled: Boolean | Function(record) : Boolean,
				title: String | Function(record) : String,
			} OR , Function(record) : Object]
		}
	*/
	rowsBtn = [],
	/* [{ handler: Function(record, elementHTML),
			icon: String,
			disabled: Boolean | Function(record) : Boolean,
			title: String | Function(record) : String,
		} OR , Function(record) : Object]
	*/
	pageSize,
	controlPanel = [],
	onRowClick = () => {},
	onUnselectRecord = () => {},
	/* custom = false, */
	/* onOrderCustom = () => {}, */
}) => {
	const [selectedRowId, setSelectedRowId] = useState(null);

	// TODO: НУЖНО ЛИ ВСЁ МЕМОИЗИРОВАТЬ
	const localList = useMemo(() => {
		setSelectedRowId(null);
		return cloneDeep(list).map((record) => ({
			uuid: v4(),
			...record,
		}));
	}, [list]);

	const { prop, direction, sortHandler } = useOrder(
		...getStartOrderProp(header)
	);

	const listLocalSorted = useSorting(
		localList,
		prop,
		direction,
		header[prop]?.order.type
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
				setSelectedRowId(indexRecord);
			} else if (indexRecord === null) {
				onUnselectRecord();
				setSelectedRowId(null);
			}
		},
		[onRowClick, onUnselectRecord, selectedRowId]
	);

	const wrapperSetPageHandler = (page) => {
		setSelectedRowId(null);
		setPageHandler(page);
	};

	const wrapperSortHandler = (prop) => {
		setSelectedRowId(null);
		sortHandler(prop);
	};

	return (
		<div>
			<TableContainer header={header} rowsBtnLength={rowsBtn.length}>
				<Title>{title}</Title>

				<Header
					header={header}
					prop={prop}
					direction={direction}
					onOrder={wrapperSortHandler}
				/>

				<Body
					list={itemsOnPageWithClanRow}
					header={header}
					rowsBtn={rowsBtn}
					rowCssClass={rowCssClass}
					selectedRowId={selectedRowId}
					onRowClick={rowClickHandler}
				/>
			</TableContainer>

			<BottomBar
				pageCount={pageCount}
				pageCurrent={currentPage}
				setPageHandler={wrapperSetPageHandler}
				controlPanel={controlPanel}
			/>
		</div>
	);
};

export default Table;
