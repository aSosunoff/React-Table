import React from "react";
import styles from "./Body.module.css";
import Row from "./row";

const Body = ({ list = [], header, rowsBtn = [] }) => {
	const row = (record) => Object.keys(header).map((key) => [key, record[key]]);

	return (
		<div className={styles.table__body}>
			{list.map(({ uuid, ...record }, indexRecord) => (
				<Row
					key={uuid}
					row={row(record)}
					rowsBtn={rowsBtn}
					indexRecord={indexRecord}
					record={record}
				/>
			))}
		</div>
	);
};

export default Body;
