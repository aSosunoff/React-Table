import React, { useMemo } from "react";
import cn from "classnames";
import Btn from "../btn";
import styles from "./Cell.module.css";

const Cell = ({
	value,
	btns = [],
	record,
	indexRecord,
	attributes,
	cssClass,
}) => {
	const memoizedWidthCell = useMemo(
		() => ({
			"--width-cell": ["1fr"].concat(Array(btns.length).fill("50px")).join(" "),
		}),
		[btns.length]
	);

	return (
		<div
			className={cn([styles.table__cell, cssClass])}
			style={memoizedWidthCell}
			{...attributes}
		>
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
