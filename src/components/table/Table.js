import React, { useCallback, useMemo, useState } from "react";
import Body from "./body/Body";
import Header from "./header/Header";
import styles from "./Table.module.css";
import Title from "./title/Title";
import sorting from "../../utils/sorting";
import usePagination from "../hooks/usePagination";
import TableContainer from "./tableContainer";
import cloneDeep from "lodash/cloneDeep";
import Paging from "./paging/Paging";
import ControlPanel from "./controlPanel";

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
	rowsBtn = [],
	title,
	/* custom = false, */
	pageSize,
	/* onOrderCustom = () => {}, */
	controlPanel = [],
}) => {
	// headOrder = { prop: id, order: 'asc' }
	const [headOrder, setHeadOrder] = useState(() => getStartOrderProp(header));

	const sortingType = useMemo(() => header[headOrder.prop]?.order.type, [
		headOrder.prop,
		header,
	]);

	const listLocalSorted = useMemo(
		() =>
			cloneDeep(list).sort((a, b) =>
				sorting(
					sortingType,
					headOrder.order,
					a[headOrder.prop],
					b[headOrder.prop]
				)
			),
		[headOrder.order, headOrder.prop, list, sortingType]
	);

	const {
		itemsOnPage,
		currentPage,
		pageCount,
		pageChangeHandler,
	} = usePagination(pageSize, listLocalSorted);

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
			<TableContainer header={header} rowsBtnLength={rowsBtn.length}>
				<Title title={title} />
				<Header header={header} order={headOrder} onOrder={onSortHandler} />
				<Body list={itemsOnPage} header={header} rowsBtn={rowsBtn} />
			</TableContainer>

			<div className={styles.controll}>
				<Paging
					pageCount={pageCount}
					pageCurrent={currentPage}
					setPageHandler={pageChangeHandler}
				/>

				<ControlPanel controlPanel={controlPanel} />
			</div>
		</>
	);
};

export default Table;
