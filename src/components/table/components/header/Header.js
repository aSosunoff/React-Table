import React, { useMemo } from "react";
import styles from "./Header.module.scss";

const Header = ({ header = {}, prop, direction, onOrder = () => {} }) => {
	const headers = useMemo(
		() =>
			Object.entries(header).map(
				([propCell, { titleHead = propCell, order }]) => {
					// TODO: ПОЧЕМУ РЕНДЕРИТЬСЯ КОГДА ДОБАВЛЯЮ ЗАПИСЬ
					const canSortable = Boolean(order);

					return {
						prop: propCell,
						titleHead,
						order: prop === propCell ? direction : null,
						canSortable,
						sortable: canSortable ? "" : null,
						onSortHandler: () => {
							if (!canSortable) {
								return;
							}

							onOrder(propCell);
						},
					};
				}
			),
		[header, prop, direction, onOrder]
	);

	return (
		<div className={styles.table__header}>
			{headers.map(
				({ prop, order, titleHead, canSortable, sortable, onSortHandler }) => (
					<div
						className={styles.table__cell_head}
						key={prop}
						data-order={order}
						data-sortable={sortable}
						onClick={onSortHandler}
					>
						<span>{titleHead}</span>
						{canSortable ? (
							<span className={styles["table__sort-arrow"]}>
								<span className={styles["sort-arrow"]}></span>
							</span>
						) : null}
					</div>
				)
			)}
		</div>
	);
};

export default Header;
