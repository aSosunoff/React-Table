import React, { useMemo } from "react";
import styles from "./ControlPanel.module.scss";
import { v4 } from "uuid";
import cn from "classnames";
import PropTypes from "prop-types";

const ControlPanel = ({ controlPanel }) => {
  const isControlPanel = Boolean(controlPanel.length);

  const controlPanelLocal = useMemo(
    () =>
      controlPanel.map((record) => ({
        uuid: v4(),
        ...record,
      })),
    [controlPanel]
  );

  return (
    <>
      {isControlPanel ? (
        <div className={styles["button-control"]} data-test-id="control-panel">
          {controlPanelLocal.map(({ uuid, ...btn }) => (
            <div
              className={cn([styles.button, { dissabled: btn.disabled }])}
              key={uuid}
              onClick={(event) => !btn.disabled && btn.handler(event)}
            >
              {btn.title}
            </div>
          ))}
        </div>
      ) : null}
    </>
  );
};

ControlPanel.defaultProps = {
  controlPanel: [],
};

ControlPanel.propTypes = {
  controlPanel: PropTypes.array,
};

export default ControlPanel;
