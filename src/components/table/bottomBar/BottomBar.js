import React from "react";
import ControlPanel from "../controlPanel";
import Paging from "../paging/Paging";
import styles from "./BottomBar.module.css";

const BottomBar = ({
	pageCount,
	pageCurrent,
	setPageHandler,
	controlPanel,
}) => {
	return (
		<div className={styles["bottom-bar"]}>
			<Paging
				pageCount={pageCount}
				pageCurrent={pageCurrent}
				setPageHandler={setPageHandler}
			/>

			<ControlPanel controlPanel={controlPanel} />
		</div>
	);
};

export default BottomBar;
