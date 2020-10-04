import React from "react";
import styles from "./TableContainer.module.css";

const TableContainer = ({ header, btnsLength, children }) => {
	const FILTER_BTN_COUNT = 1;
	const widthColumn = {
		"--width-column": Object.values(header)
			.map(({ width = "1fr" }) => width)
			.concat(Array(btnsLength || FILTER_BTN_COUNT).fill("50px"))
			.join(" "),
	};

	return (
		<div className={styles.table} style={widthColumn}>
			{children}
		</div>
	);
};

export default TableContainer;
