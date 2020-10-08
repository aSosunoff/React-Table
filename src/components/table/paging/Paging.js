import React, { useEffect, useState } from "react";
import styles from "./Paging.module.css";
import cn from "classnames";

const Paging = ({ pageCount, pageCurrent, setPageHandler }) => {
	const [pageCurrentLocal, setPageLocal] = useState(pageCurrent);

	const isDisable = !Boolean(pageCount);

	useEffect(() => {
		setPageLocal(pageCurrent);
	}, [pageCurrent]);

	const onFirstPage = () => {
		if (isDisable) {
			return;
		}
		setPageHandler(1);
	};

	const onPrevPage = () => {
		if (isDisable) {
			return;
		}
		if (pageCurrent - 1 === 0) {
			return;
		}
		setPageHandler(pageCurrent - 1);
	};

	const onCurrentPage = ({ target }) => {
		if (isDisable) {
			return;
		}
		const page = Number(target.value);
		if (page < 1 || page > pageCount) {
			setPageLocal("");
		} else {
			setPageLocal(page);
			setPageHandler(page);
		}
	};

	const onNextPage = () => {
		if (isDisable) {
			return;
		}
		if (pageCurrent + 1 > pageCount) {
			return;
		}
		setPageHandler(pageCurrent + 1);
	};

	const onLastPage = () => {
		if (isDisable) {
			return;
		}
		setPageHandler(pageCount);
	};

	return (
		<div
			className={cn({
				[styles.paging]: Boolean(pageCount),
				[styles["paging-disable"]]: !Boolean(pageCount),
			})}
		>
			<div className={styles["first-page"]} onClick={onFirstPage}>
				первая
			</div>

			<div className={styles["box-command"]}>
				<div className={styles.prev} onClick={onPrevPage}></div>

				<input
					type="text"
					onChange={onCurrentPage}
					value={pageCurrentLocal}
					disabled={Boolean(pageCount) ? "" : null}
				/>

				<div className={styles.next} onClick={onNextPage}></div>
			</div>

			<div className={styles["last-page"]} onClick={onLastPage}>
				последняя
			</div>
		</div>
	);
};

export default Paging;
