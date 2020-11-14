import React, { useEffect, useState } from "react";
import styles from "./Text.module.scss";
import cn from "classnames";

const Text = ({
	clsMain,
	clsButton,
	value,
	onSet = () => {},
	onClear = () => {},
} = {}) => {
	const [valueLocal, setValueLocal] = useState(value);

	useEffect(() => {
		setValueLocal(value);
	}, [value]);

	const isValue = Boolean(valueLocal);

	const enterHandler = ({ key, target }) => {
		if (key === "Enter") {
			onSet(target.value);
		}
	};

	const changeHandler = ({ target }) => {
		setValueLocal(target.value);
	};

	const clearHandler = () => {
		setValueLocal("");
		onClear();
	};

	return (
		<div
			className={cn([clsMain, styles.table__cell_input])}
			style={{
				"--button-delete": isValue ? 1 : 0,
			}}
		>
			<input
				type="text"
				value={valueLocal}
				onKeyUp={enterHandler}
				onChange={changeHandler}
			/>

			{isValue ? (
				<i className={cn(["material-icons", clsButton])} onClick={clearHandler}>
					clear
				</i>
			) : null}
		</div>
	);
};

export default Text;
