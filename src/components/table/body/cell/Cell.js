import React, { useMemo } from "react";
import Btn from "../btn";
import styles from "./Cell.module.css";

const Cell = ({ value, btns = [], record, indexRecord }) => {
	const memoizedWidthCell = useMemo(() => {
		let styleColumn = "1fr";
		styleColumn += " 50px".repeat(btns.length);
		return {
			"--width-cell": styleColumn,
		};
	}, [btns.length]);

	const formating = (key, record) => {
		const { format = () => record[key] } = this.header[key];
		return format(record[key], record);
	};

	return (
		<div className={styles.table__cell} style={memoizedWidthCell}>
			{value ? (
				<>
					<div className={styles.table__cell_field}>
						<div className={styles["table__cell_field-nowrap"]}>{value}</div>
					</div>

					{btns.map(({ uuid, btn }) => (
						<Btn
							key={uuid}
							btn={btn}
							record={record}
							indexRecord={indexRecord}
						/>
					))}
				</>
			) : null}
		</div>
	);
};

export default Cell;
