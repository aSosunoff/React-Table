import { cloneDeep } from "lodash";
import React, { useCallback } from "react";
import { v4 } from "uuid";
import styles from "./Body.module.css";
import Row from "./row";

const Body = ({ list = [], header, rowsBtn = [] }) => {
	const row = useCallback(
		(record) =>
			Object.keys(header).map((key) => {
				const btns = cloneDeep(header[key].btns || []);

				return [
					key,
					record[key],
					btns.map((btn) => ({
						uuid: v4(),
						btn,
					})),
				];
			}),
		[header]
	);

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
