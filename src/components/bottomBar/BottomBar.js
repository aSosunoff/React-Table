import React from "react";
import ControlPanel from "../controlPanel";
import Paging from "../paging/Paging";
import styles from "./BottomBar.module.scss";

const BottomBar = ({
  pageCount,
  pageCurrent,
  setPageHandler,
  controlPanel,
}) => (
  <div className={styles["bottom-bar"]}>
    <Paging
      pageCount={pageCount}
      pageCurrent={pageCurrent}
      setPageHandler={setPageHandler}
    />

    <ControlPanel controlPanel={controlPanel} />
  </div>
);

export default BottomBar;
