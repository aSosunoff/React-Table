import React, { useEffect, useState } from "react";
import cn from "classnames";
import PropTypes from "prop-types";
import styles from "./Paging.module.scss";

const Paging = ({ pageCount, pageCurrent, setPageHandler }) => {
  const [pageCurrentLocal, setPageLocal] = useState(pageCurrent);

  const isDisable = !pageCount || pageCount === 1;
  const isFirstPage = pageCurrentLocal === 1;
  const isLastPage = pageCount === pageCurrentLocal;
  const isPrevPageDisabled = pageCurrentLocal - 1 === 0;
  const isNextPageDisabled = pageCurrentLocal + 1 > pageCount;

  useEffect(() => setPageLocal(pageCurrent), [pageCurrent]);

  const onFirstPage = () => {
    if (isDisable || isFirstPage) {
      return;
    }
    setPageHandler(1);
  };

  const onPrevPage = () => {
    if (isDisable) {
      return;
    }
    if (isPrevPageDisabled) {
      return;
    }
    setPageHandler(pageCurrentLocal - 1);
  };

  const onCurrentPage = ({ target }) => {
    if (isDisable) {
      return;
    }
    const page = Number(target.value);
    if (page < 1 || page > pageCount) {
      setPageLocal("");
    } else {
      setPageLocal(page);
      setPageHandler(page);
    }
  };

  const onNextPage = () => {
    if (isDisable) {
      return;
    }
    if (isNextPageDisabled) {
      return;
    }
    setPageHandler(pageCurrentLocal + 1);
  };

  const onLastPage = () => {
    if (isDisable || isLastPage) {
      return;
    }
    setPageHandler(pageCount);
  };

  const className = {
    firstPage: cn([
      styles["first-page"],
      {
        [styles.disable]: isDisable || isFirstPage,
      },
    ]),
    boxCommand: styles["box-command"],
    prev: cn([
      styles.prev,
      {
        [styles.disable]: isDisable || isPrevPageDisabled,
      },
    ]),
    input: cn({
      [styles.disable]: isDisable,
    }),
    next: cn([
      styles.next,
      {
        [styles.disable]: isDisable || isNextPageDisabled,
      },
    ]),
    lastPage: cn([
      styles["last-page"],
      {
        [styles.disable]: isDisable || isLastPage,
      },
    ]),
  };

  return (
    <div className={styles.paging}>
      <div
        className={className.firstPage}
        onClick={onFirstPage}
        data-test-id="paging-first-page"
      >
        1...
      </div>

      <div className={className.boxCommand}>
        <div
          className={className.prev}
          onClick={onPrevPage}
          data-test-id="paging-prev"
        />

        <input
          className={className.input}
          type="number"
          onChange={onCurrentPage}
          value={pageCurrentLocal}
          disabled={isDisable}
          data-test-id="paging-input"
        />

        <div
          className={className.next}
          onClick={onNextPage}
          data-test-id="paging-next"
        />
      </div>

      <div
        className={className.lastPage}
        onClick={onLastPage}
        data-test-id="paging-last-page"
      >
        ...
        {pageCount}
      </div>
    </div>
  );
};

Paging.defaultProps = {
  pageCount: 1,
  pageCurrent: 1,
  setPageHandler: () => null,
};

Paging.propTypes = {
  pageCount: PropTypes.number,
  pageCurrent: PropTypes.number,
  setPageHandler: PropTypes.func,
};

export default Paging;
