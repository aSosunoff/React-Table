import React, { useMemo } from "react";
import styles from "./Btn.module.css";
import { cloneDeep } from "lodash";
import cn from "classnames";
import isEmptyObject from "../../../utils/isEmptyObject";

const Btn = ({ btn, record = {}, indexRecord }) => {
	const isBtn = useMemo(() => {
		if (isEmptyObject(record)) {
			return false;
		}

		return typeof btn === "object" && btn !== null
			? Boolean(Object.keys(btn).length)
			: Boolean(btn);
	}, [btn, record]);

	const canDissabled = useMemo(() => {
		if (typeof btn !== "object" || btn === null) {
			return true;
		}

		if (!("disabled" in btn)) {
			return false;
		}
		if (typeof btn.disabled === "boolean") {
			return btn.disabled;
		}
		if (typeof btn.disabled === "function") {
			return btn.disabled(record);
		}
		return false;
	}, [btn, record]);

	const getTitle = useMemo(() => {
		if (typeof btn.title === "function") {
			return btn.title(record);
		}
		return btn.title;
	}, [btn, record]);

	const clickHandler = (event) => {
		if (!canDissabled) {
			btn.handler(
				cloneDeep(record),
				event.target.closest(`.${styles.table__cell_btn}`),
				indexRecord
			);
		}
	};

	return (
		<>
			{isBtn ? (
				<div
					className={cn([
						styles.table__cell_btn,
						{
							[styles.disabled]: canDissabled,
						},
					])}
					onClick={clickHandler.bind(this)}
					title={getTitle}
				>
					<i className="material-icons">{btn.icon}</i>
				</div>
			) : (
				<div></div>
			)}
		</>
	);
};

export default Btn;
