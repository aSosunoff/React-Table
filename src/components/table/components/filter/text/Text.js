import React, { useCallback, useEffect, useMemo, useState } from "react";
import styles from "./Text.module.scss";
import cn from "classnames";
import PropTypes from "prop-types";

const Text = ({ clsMain, clsButton, value, onSet, onClear } = {}) => {
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

  const changeHandler = useCallback(({ target }) => {
    setValueLocal(target.value);
  }, []);

  const clearHandler = useCallback(() => {
    setValueLocal("");
    onClear();
  }, [onClear]);

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
        <i className={cn(["material-icons", clsButton])} onClick={clearHandler}>
          clear
        </i>
      ) : null}
    </div>
  );
};

Text.defaultProps = {
  onSet: () => null,
  onClear: () => null,
};

Text.propTypes = {
  clsMain: PropTypes.string,
  clsButton: PropTypes.string,
  value: PropTypes.string,
  onSet: PropTypes.func,
  onClear: PropTypes.func,
};

export default Text;
