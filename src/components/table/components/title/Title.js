import React from "react";
import styles from "./Title.module.scss";

const Title = ({ children }) =>
	typeof children === "string" && Boolean(children) ? (
		<div className={styles.table__cell_title}>{children}</div>
	) : null;

export default Title;
