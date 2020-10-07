import React from "react";
import styles from "./Body.module.css";
import { v4 } from "uuid";

const Body = ({ list = [], header }) => {
	const localList = list.map((record) => ({
		uuid: v4(),
		...record,
	}));

	const isRecortFill = ({ uuid, ...record }) => {
		return Object.keys(record).length;
	};

	return (
		<div className={styles.table__body}>
			{localList.map((record) => (
				<div key={record.uuid} className={styles.table__row}>
					{isRecortFill(record) ? (
						Object.keys(header).map((key) => (
							<div className={styles.table__cell} key={key}>
								<div className={styles.table__cell_field}>
									<div className={styles["table__cell_field-nowrap"]}>
										{record[key]}
									</div>
								</div>
							</div>
						))
					) : (
						<div className={styles.table__cell}></div>
					)}
				</div>
			))}
		</div>
	);
};

export default Body;
