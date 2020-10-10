import React, { useMemo } from "react";
import styles from "./Header.module.css";

const Header = ({ header = {}, prop, direction, onOrder = () => {} }) => {
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

	const getDirectionOrder = (propCell) => (prop === propCell ? direction : "");

	const canSortable = (cell) => Boolean(cell.value.order);

	const onSortHandler = (cell) => {
		if (!cell.value.order) {
			return;
		}

		onOrder(cell.prop);
	};

	return (
		<div className={styles.table__header}>
			{headers.map((cell) => (
				<div
					className={styles.table__cell_head}
					key={cell.prop}
					data-order={getDirectionOrder(cell.prop) || null}
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
