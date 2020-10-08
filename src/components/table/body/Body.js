import React, { useMemo } from "react";
import styles from "./Body.module.css";
import { v4 } from "uuid";
import { cloneDeep } from "lodash";
import Row from "./Row";

const Body = ({ list = [], header, rowsBtn = [] }) => {
	const localList = useMemo(() => {
		return cloneDeep(list).map((record) => ({
			uuid: v4(),
			...record,
		}));
	}, [list]);

	const row = (record) => Object.keys(header).map((key) => [key, record[key]]);

	return (
		<div className={styles.table__body}>
			{localList.map(({ uuid, ...record }, indexRecord) => (
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
