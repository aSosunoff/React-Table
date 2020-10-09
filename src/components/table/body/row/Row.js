import { cloneDeep } from "lodash";
import React, { useMemo } from "react";
import { v4 } from "uuid";
import Btn from "../btn";
import Cell from "../cell";
import styles from "./Row.module.css";

const Row = ({ row, rowsBtn, indexRecord, record, onRowClick }) => {
	const localRowsBtn = useMemo(
		() =>
			cloneDeep(rowsBtn).map((record) => ({
				uuid: v4(),
				...record,
			})),
		[rowsBtn]
	);

	return (
		<div className={styles.table__row} onClick={onRowClick}>
			{row.map(([key, value, btns]) => (
				<Cell
					key={key}
					value={value}
					btns={btns}
					record={record}
					indexRecord={indexRecord}
				/>
			))}

			{localRowsBtn.map(({ uuid, ...btn }) => (
				<Btn key={uuid} btn={btn} record={record} indexRecord={indexRecord} />
			))}
		</div>
	);
};

export default Row;
