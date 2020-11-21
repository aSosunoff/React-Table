import React, { useMemo } from "react";
import styles from "./Button.module.scss";
import cn from "classnames";

const Button = ({
  clsMain,
  clsButton,
  icon,
  value,
  handler = () => {},
  onSet = () => {},
  onClear = () => {},
} = {}) => {
  const isValue = Boolean(value?.value);

  const title = useMemo(() => value?.title || value?.value || "", [value]);

  const changeHandler = ({ target }) => {
    handler((value, additionalProperties) => {
      onSet(value, additionalProperties);
    }, target);
  };

  return (
    <div
      className={cn([clsMain, styles.table__cell_input_button])}
      style={{
        "--button-delete": isValue ? 1 : 0,
      }}
    >
      <div className={styles.table__cell_input}>{`${title}`}</div>

      <i className={cn(["material-icons", clsButton])} onClick={changeHandler}>
        {icon}
      </i>

      {isValue ? (
        <i className={cn(["material-icons", clsButton])} onClick={onClear}>
          clear
        </i>
      ) : null}
    </div>
  );
};

export default Button;
