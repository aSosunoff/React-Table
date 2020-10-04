import React from "react";
import styles from "./Title.module.css";

function Title({ title = "" }) {
	return Boolean(title) ? (
		<div className={styles.table__cell_title}>{title}</div>
	) : null;
}

export default Title;
