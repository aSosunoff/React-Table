import React, { useMemo } from "react";
import styles from "./Btn.module.scss";
import { cloneDeep } from "lodash";
import cn from "classnames";
import isEmptyObject from "../../../utils/isEmptyObject";

const Btn = ({ btn, record = {}, indexRecord }) => {
	const localBtn = typeof btn === "function" ? btn(record) : btn;

	const isBtn = useMemo(() => {
		if (isEmptyObject(record)) {
			return false;
		}

		return typeof localBtn === "object" && localBtn !== null
			? Boolean(Object.keys(localBtn).length)
			: Boolean(localBtn);
	}, [localBtn, record]);

	const canDissabled = useMemo(() => {
		if (typeof localBtn !== "object" || localBtn === null) {
			return true;
		}

		if (!("disabled" in localBtn)) {
			return false;
		}
		if (typeof localBtn.disabled === "boolean") {
			return localBtn.disabled;
		}
		if (typeof localBtn.disabled === "function") {
			return localBtn.disabled(record);
		}
		return false;
	}, [localBtn, record]);

	const getTitle = useMemo(() => {
		if (typeof localBtn.title === "function") {
			return localBtn.title(record);
		}
		return localBtn.title;
	}, [localBtn, record]);

	const clickHandler = (event) => {
		if (!canDissabled) {
			localBtn.handler(
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
					<i className="material-icons">{localBtn.icon}</i>
				</div>
			) : (
				<div></div>
			)}
		</>
	);
};

export default Btn;
