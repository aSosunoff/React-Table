import React, { useMemo } from "react";
import styles from "./TableContainer.module.css";

const TableContainer = ({ header, btnsLength, children }) => {
	const memoizedWidthColumn = useMemo(() => {
		const FILTER_BTN_COUNT = 1;

		return {
			"--width-column": Object.values(header)
				.map(({ width = "1fr" }) => width)
				.concat(Array(btnsLength || FILTER_BTN_COUNT).fill("50px"))
				.join(" "),
		};
	}, [header, btnsLength]);

	return (
		<div className={styles.table} style={memoizedWidthColumn}>
			{children}
		</div>
	);
};

export default TableContainer;
