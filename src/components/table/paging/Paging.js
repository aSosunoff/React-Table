import React, { useEffect, useState } from "react";
import styles from "./Paging.module.css";

const Paging = ({ pageCount, pageCurrent, setPageHandler }) => {
	const [pageCurrentLocal, setPageLocal] = useState(pageCurrent);

	useEffect(() => {
		setPageLocal(pageCurrent);
	}, [pageCurrent]);

	const onFirstPage = () => {
		setPageHandler(1);
	};

	const onPrevPage = () => {
		if (pageCurrent - 1 === 0) {
			return;
		}
		setPageHandler(pageCurrent - 1);
	};

	const onCurrentPage = ({ target }) => {
		const page = Number(target.value);
		if (page < 1 || page > pageCount) {
			setPageLocal("");
		} else {
			setPageLocal(page);
			setPageHandler(page);
		}
	};

	const onNextPage = () => {
		if (pageCurrent + 1 > pageCount) {
			return;
		}
		setPageHandler(pageCurrent + 1);
	};

	const onLastPage = () => {
		setPageHandler(pageCount);
	};

	return (
		<>
			{pageCount ? (
				<div className={styles.paging}>
					<div className={styles["first-page"]} onClick={onFirstPage}>
						первая
					</div>
					<div className={styles["box-command"]}>
						<div className={styles.prev} onClick={onPrevPage}></div>
						<input
							type="text"
							onChange={onCurrentPage}
							value={pageCurrentLocal}
						/>
						<div className={styles.next} onClick={onNextPage}></div>
					</div>
					<div className={styles["last-page"]} onClick={onLastPage}>
						последняя
					</div>
				</div>
			) : (
				<div className={styles["paging-disable"]}>
					<div className={styles["first-page"]}>первая</div>
					<div className={styles["box-command"]}>
						<div className={styles.prev}></div>
						<input type="text" value={pageCurrentLocal} disabled />
						<div className={styles.next}></div>
					</div>
					<div className={styles["last-page"]}>последняя</div>
				</div>
			)}
		</>
	);
};

export default Paging;
