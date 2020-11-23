import React, { useMemo } from "react";
import styles from "./Btn.module.scss";
import { cloneDeep } from "lodash";
import cn from "classnames";
import isEmptyObject from "../../../utils/isEmptyObject";
import PropTypes from "prop-types";

const Btn = ({ btn, record, indexRecord }) => {
  const localBtn = useMemo(
    () => (typeof btn === "function" ? btn(record) : btn),
    [btn, record]
  );

  const isBtn = useMemo(() => {
    if (isEmptyObject(record)) {
      return false;
    }

    return typeof localBtn === "object" && localBtn !== null
      ? Boolean(Object.keys(localBtn).length)
      : Boolean(localBtn);
  }, [localBtn, record]);

  const canDissabled = useMemo(() => {
    if (typeof localBtn !== "object" || localBtn === null) {
      return true;
    }

    if (!("disabled" in localBtn)) {
      return false;
    }
    if (typeof localBtn.disabled === "boolean") {
      return localBtn.disabled;
    }
    if (typeof localBtn.disabled === "function") {
      return localBtn.disabled(record);
    }
    return false;
  }, [localBtn, record]);

  const getTitle = useMemo(() => {
    if (!isBtn) {
      return "";
    }

    if (typeof localBtn.title === "function") {
      return localBtn.title(record);
    }
    return localBtn.title;
  }, [isBtn, localBtn, record]);

  const clickHandler = (event) => {
    if (!canDissabled) {
      localBtn.handler(
        cloneDeep(record),
        event.target.closest(`.${styles.table__cell_btn}`),
        indexRecord
      );
    }
  };

  return isBtn ? (
    <div
      className={cn([
        styles.table__cell_btn,
        {
          [styles.disabled]: canDissabled,
        },
      ])}
      onClick={clickHandler.bind(this)}
      title={getTitle}
      data-test-id="btn-button"
    >
      <i className="material-icons">{localBtn.icon}</i>
    </div>
  ) : (
    <div data-test-id="btn-default-button"></div>
  );
};

Btn.defaultProps = {
  record: {},
};

Btn.propTypes = {
  btn: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  record: PropTypes.object,
  indexRecord: PropTypes.number,
};

export default Btn;
