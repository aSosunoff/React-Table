import { cloneDeep } from "lodash";
import React, { useMemo } from "react";
import { v4 } from "uuid";
import cn from "classnames";
import Btn from "../btn";
import Cell from "../cell";
import styles from "./Row.module.scss";

const Row = ({
	row,
	rowsBtn,
	rowCssClass = () => null,
	indexRecord,
	isSelected,
	record,
	onRowClick,
}) => {
	const localRowsBtn = useMemo(
		() =>
			cloneDeep(rowsBtn).map((btn) => ({
				uuid: v4(),
				btn,
			})),
		[rowsBtn]
	);

	return (
		<div
			className={cn([
				styles.table__row,
				rowCssClass(record),
				{
					[styles["selected-row"]]: isSelected,
				},
			])}
			onClick={onRowClick}
		>
			{row.map(({ key, ...cell }) => (
				<Cell key={key} {...cell} record={record} indexRecord={indexRecord} />
			))}

			{localRowsBtn.map(({ uuid, btn }) => (
				<Btn key={uuid} btn={btn} record={record} indexRecord={indexRecord} />
			))}
		</div>
	);
};

export default Row;
