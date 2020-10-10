import React, { useMemo } from "react";
import styles from "./ControlPanel.module.css";
import { v4 } from "uuid";
import cn from "classnames";

const ControlPanel = ({ controlPanel = [] } = {}) => {
	const isControlPanel = Boolean(controlPanel.length);

	const controlPanelLocal = useMemo(
		() =>
			controlPanel.map((record) => ({
				uuid: v4(),
				...record,
			})),
		[controlPanel]
	);

	const buttonHandler = (btn, event) => {
		if (!btn.disabled) {
			btn.handler(event);
		}
	};

	return (
		<>
			{isControlPanel && (
				<div className={styles["button-control"]}>
					{controlPanelLocal.map(({ uuid, ...btn }) => (
						<div
							className={cn([styles.button, { dissabled: btn.disabled }])}
							key={uuid}
							onClick={buttonHandler.bind(this, btn)}
						>
							{btn.title}
						</div>
					))}
				</div>
			)}
		</>
	);
};

export default ControlPanel;
