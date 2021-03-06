import React, { useCallback, useEffect, useMemo, useState } from "react";
import cn from "classnames";
import PropTypes from "prop-types";
import styles from "./Text.module.scss";

const Text = ({ clsMain, clsButton, value, onSet }) => {
  const [valueLocal, setValueLocal] = useState(value);

  const isValue = useMemo(() => Boolean(valueLocal), [valueLocal]);

  useEffect(() => {
    setValueLocal(value);
  }, [value]);

  const enterHandler = useCallback(
    ({ key, target }) => {
      if (key === "Enter") {
        onSet(target.value);
      }
    },
    [onSet]
  );

  const changeHandler = useCallback(
    ({ target }) => {
      setValueLocal(target.value);
    },
    [setValueLocal]
  );

  const clearHandler = useCallback(() => {
    setValueLocal("");
    onSet();
  }, [setValueLocal, onSet]);

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
        data-test-id="input"
        onKeyUp={enterHandler}
        onChange={changeHandler}
      />

      {isValue ? (
        <i
          className={cn(["material-icons", clsButton])}
          onClick={clearHandler}
          data-test-id="text-clear-button"
        >
          clear
        </i>
      ) : null}
    </div>
  );
};

Text.defaultProps = {
  onSet: () => null,
};

Text.propTypes = {
  clsMain: PropTypes.string,
  clsButton: PropTypes.string,
  value: PropTypes.string,
  onSet: PropTypes.func,
};

export default Text;
