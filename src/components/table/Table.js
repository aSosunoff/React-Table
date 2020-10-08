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
	rowsBtn = [],
	title,
	/* custom = false, */
	pageSize,
	/* onOrderCustom = () => {}, */
	controlPanel = [],
}) => {
	const localList = useMemo(
		() =>
			cloneDeep(list).map((record) => ({
				uuid: v4(),
				...record,
			})),
		[list]
	);
	// headOrder = { prop: id, order: 'asc' }
	const [headOrder, setHeadOrder] = useState(() => getStartOrderProp(header));

	const listLocalSorted = useMemo(() => {
		const { prop, order } = headOrder;

		const sortingType = header[prop]?.order.type;

		return cloneDeep(localList).sort((a, b) =>
			sorting(sortingType, order, a[prop], b[prop])
		);
	}, [headOrder, header, localList]);

	const {
		itemsOnPage,
		currentPage,
		pageCount,
		setPageHandler,
	} = usePagination(pageSize, listLocalSorted);

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
			<TableContainer header={header} rowsBtnLength={rowsBtn.length}>
				<Title title={title} />
				<Header header={header} order={headOrder} onOrder={onSortHandler} />
				<Body list={itemsOnPageWithClanRow} header={header} rowsBtn={rowsBtn} />
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
