import React, { useCallback, useMemo } from "react";
import cn from "classnames";
import PropTypes from "prop-types";
import styles from "./Button.module.scss";

const Button = ({ clsMain, clsButton, icon, value, handler, onSet }) => {
  const isValue = useMemo(() => Boolean(value?.value), [value]);

  const title = useMemo(() => value?.title || value?.value || "", [value]);

  const changeHandler = useCallback(
    ({ target }) => {
      handler((value, additionalProperties) => {
        onSet(value, additionalProperties);
      }, target);
    },
    [handler, onSet]
  );

  return (
    <div
      className={cn([clsMain, styles.table__cell_input_button])}
      style={{
        "--button-delete": isValue ? 1 : 0,
      }}
    >
      <div className={styles.table__cell_input} data-test-id="button-title">
        {`${title}`}
      </div>

      <i
        className={cn(["material-icons", clsButton])}
        onClick={changeHandler}
        data-test-id="button-icon"
      >
        {icon}
      </i>

      {isValue ? (
        <i
          className={cn(["material-icons", clsButton])}
          onClick={() => onSet()}
          data-test-id="button-clear-button"
        >
          clear
        </i>
      ) : null}
    </div>
  );
};

Button.defaultProps = {
  handler: () => null,
  onSet: () => null,
};

Button.propTypes = {
  clsMain: PropTypes.string,
  clsButton: PropTypes.string,
  icon: PropTypes.string,
  value: PropTypes.shape({
    /* value: PropTypes.any, */
    title: PropTypes.string,
  }),
  handler: PropTypes.func,
  onSet: PropTypes.func,
};

export default Button;
