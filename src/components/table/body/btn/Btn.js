import React, { useCallback, useMemo } from "react";
import styles from "./Btn.module.css";
import { cloneDeep } from "lodash";
import cn from "classnames";
import isEmptyObject from "../../utils/isEmptyObject";

const Btn = ({ btn, record = {}, indexRecord }) => {
	const getBtn = useMemo(() => {
		return typeof btn !== "function" ? btn : btn(record);
	}, [btn, record]);

	const isBtn = useMemo(() => {
		if (isEmptyObject(record)) {
			return false;
		}

		return typeof getBtn === "object" && getBtn !== null
			? Boolean(Object.keys(getBtn).length)
			: Boolean(getBtn);
	}, [getBtn, record]);

	const canDissabled = useCallback(() => {
		if (!("disabled" in getBtn)) {
			return false;
		}
		if (typeof getBtn.disabled === "boolean") {
			return getBtn.disabled;
		}
		if (typeof getBtn.disabled === "function") {
			return getBtn.disabled(record);
		}
		return false;
	}, [getBtn, record]);

	const getTitle = useMemo(() => {
		if (typeof getBtn.title === "function") {
			return getBtn.title(record);
		}
		return getBtn.title;
	}, [getBtn, record]);

	const clickHandler = (event) => {
		if (!canDissabled()) {
			getBtn.handler(
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
							[styles.disabled]: canDissabled(),
						},
					])}
					onClick={clickHandler.bind(this)}
					title={getTitle}
				>
					<i className="material-icons">{getBtn.icon}</i>
				</div>
			) : (
				<div></div>
			)}
		</>
	);
};

export default Btn;
