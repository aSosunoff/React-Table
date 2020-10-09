import React from "react";
import styles from "./Cell.module.css";

const Cell = ({ value }) => {
	return (
		<div className={styles.table__cell}>
			{value ? (
				<div className={styles.table__cell_field}>
					<div className={styles["table__cell_field-nowrap"]}>{value}</div>
				</div>
			) : null}
		</div>
	);
};

export default Cell;
