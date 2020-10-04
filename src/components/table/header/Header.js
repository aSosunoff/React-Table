import React, { useMemo, useState } from "react";
import styles from "./Header.module.css";

const getDirectionByOrderObject = (entriesHeader) => {
	const firstHeaderByDirection = entriesHeader.find(
		([prop, { order: { direction = null } = {} } = {}]) => prop && direction
	);

	return firstHeaderByDirection
		? {
				prop: firstHeaderByDirection[0],
				order: firstHeaderByDirection[1].order.direction,
		  }
		: null;
};

const getDirectionByOrderBoolean = (entriesHeader) => {
	const firstByOrder = entriesHeader.find(([, { order = null } = {}]) => order);

	return firstByOrder
		? {
				prop: firstByOrder[0],
				order: "asc",
		  }
		: null;
};

const getStartOrderProp = (header) => {
	const entriesHeader = Object.entries(header);

	const listHeaderByDirection = getDirectionByOrderObject(entriesHeader);

	if (listHeaderByDirection) {
		return listHeaderByDirection;
	}

	const listHeaderByOrder = getDirectionByOrderBoolean(entriesHeader);

	if (listHeaderByOrder) {
		return listHeaderByOrder;
	}

	return {
		prop: null,
		order: "",
	};
};

const Header = ({ header = {}, onOrder = () => {} }) => {
	const [headOrder, setHeadOrder] = useState(getStartOrderProp(header));

	const headers = useMemo(
		() =>
			Object.entries(header).map(([key, obj]) => ({
				prop: key,
				value: {
					titleHead: key,
					...obj,
				},
			})),
		[header]
	);

	const getDirectionOrder = ({ prop }) =>
		headOrder.prop === prop ? headOrder.order : "";

	const canSortable = (cell) => Boolean(cell.value.order);

	const onSortHandler = (cell) => {
		if (!cell.value.order) {
			return;
		}

		if (headOrder.prop === cell.prop) {
			setHeadOrder({
				...headOrder,
				order: headOrder.order === "desc" || !headOrder.order ? "asc" : "desc",
			});
		} else {
			setHeadOrder({
				prop: cell.prop,
				order: "asc",
			});
		}

		onOrder({
			prop: cell.prop,
			order: getDirectionOrder(cell),
		});
	};

	return (
		<div className={styles.table__header}>
			{headers.map((cell) => (
				<div
					className={styles.table__cell_head}
					key={cell.prop}
					data-order={getDirectionOrder(cell) || null}
					data-sortable={canSortable(cell) ? "" : null}
					onClick={() => onSortHandler(cell)}
				>
					<span>{cell.value.titleHead}</span>
					{canSortable(cell) ? (
						<span className={styles["table__sort-arrow"]}>
							<span className={styles["sort-arrow"]}></span>
						</span>
					) : null}
				</div>
			))}
		</div>
	);
};

export default Header;
