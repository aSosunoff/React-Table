import React, { useCallback, useEffect, useMemo, useRef } from "react";
import { v4 } from "uuid";
import PropTypes from "prop-types";
import { cloneDeep } from "lodash";
import Header from "./header/Header";
import Title from "./title/Title";
import TableContainer from "./tableContainer";
import BottomBar from "./bottomBar/BottomBar";
import { useCleanRecord } from "../hooks/useCleanRecord";
import { usePropDirection } from "../hooks/usePropDirection";
import Filter from "./filter/Filter";
import { getStartOrderProp } from "../utils/getStartOrderProp";
import { withContext } from "../HOC/withContext";
import { RecordProvider, useRecordContext } from "../context/recordContext";
import Record from "./record";
import variable from "./variable.module.scss";
import { usePagination } from "../hooks/usePagination";
import { useSorting } from "../hooks/useSortable";
import { useFilter } from "../hooks/useFilter";

const Table = ({
  title, // String
  rowCssClass, // Function(record) : String,
  recordAttributes, // Object | Function(record) : Object,
  recordStyles, // Object | Function(record) : Object,
  list,
  header,
  /* NAME_PROPERTY: {
			titleHead: String,
			titleCell: Boolean | Function(value, record) : String,
			order: Object, // { type: 'string|number|date', direction: 'asc|desc'} | true
			width: Number,
			format: Function(value, record) : String,
			filter: {
				{
					type: 'list',
					items: Array, // [{id, text}],
					detail: Object, // custom
				}
				OR
				{
					type: 'text',
					detail: Object, // custom
				}
				OR
				{
					type: 'button',
					icon: String,
					handler: Function(callback(value), elementHTML),
					detail: Object, // custom
				}
			}
			cssClass: Function(value, key, record) : String,
			clickHandler: Function(value, record),
			btns: [{
				handler: Function(record, elementHTML),
				icon: String,
				disabled: Boolean | Function(record) : Boolean,
				title: String | Function(record) : String,
			} OR , Function(record) : Object]
		}
	*/
  rowsBtn,
  /* [{
      handler: Function(record, elementHTML),
			icon: String,
			disabled: Boolean | Function(record) : Boolean,
			title: String | Function(record) : String,
		} OR , Function(record) : Object]
	*/
  pageSize,
  controlPanel,
  custom,
  onFilterHandler,
  onOrderHandler,
  onPageHandler,
  pageCount,
  currentPage,
}) => {
  const { selectedRecordClearHandler } = useRecordContext();

  const localList = useMemo(
    () =>
      cloneDeep(list).map((record) => ({
        uuid: v4(),
        ...record,
      })),
    [list]
  );

  const {
    filteredList,
    filterState,
    filterPanel,
    isFilter,
    setFilterHandler,
    clearFilterHandler,
  } = useFilter(localList, header);

  const { prop, direction, setPropDirectionHandler } = usePropDirection(
    ...getStartOrderProp(header)
  );

  const listLocalSorted = useSorting(
    filteredList,
    prop,
    direction,
    header[prop]?.order.type
  );

  const pagination = usePagination(pageSize, listLocalSorted);

  const getPageCount = useMemo(
    () => (custom ? pageCount : pagination.pageCount),
    [custom, pageCount, pagination.pageCount]
  );

  const getPageCurrent = useMemo(
    () => (custom ? currentPage : pagination.currentPage),
    [custom, currentPage, pagination.currentPage]
  );

  const itemsOnPageWithClanRow = useCleanRecord(
    custom ? localList : pagination.itemsOnPage,
    pageSize
  );

  const didUpdateOrderHandler = useRef(false);

  useEffect(() => {
    if (!custom) {
      return;
    }

    if (didUpdateOrderHandler.current) {
      onOrderHandler(prop, direction);
    } else {
      didUpdateOrderHandler.current = true;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [custom, prop, direction]);

  const didUpdateFilterHandler = useRef(false);

  useEffect(() => {
    if (!custom) {
      return;
    }

    if (didUpdateFilterHandler.current) {
      onFilterHandler(filterState);
    } else {
      didUpdateFilterHandler.current = true;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [custom, filterState]);

  const wrapperSetPageHandler = useCallback(
    (page) => {
      selectedRecordClearHandler();
      if (custom) {
        onPageHandler(page);
      } else {
        pagination.setPageHandler(page);
      }
    },
    [selectedRecordClearHandler, custom, onPageHandler, pagination]
  );

  const wrapperSortHandler = useCallback(
    (prop) => {
      selectedRecordClearHandler();
      setPropDirectionHandler(prop);
    },
    [setPropDirectionHandler, selectedRecordClearHandler]
  );

  return (
    <div className={variable.table}>
      <TableContainer header={header} rowsBtnLength={rowsBtn.length}>
        <Title>{title}</Title>

        <Header
          header={header}
          prop={prop}
          direction={direction}
          onOrder={wrapperSortHandler}
        />

        {isFilter ? (
          <Filter
            filterState={filterState}
            filterPanel={filterPanel}
            onSetFilter={setFilterHandler}
            onClearFilter={clearFilterHandler}
          />
        ) : null}

        <div>
          {itemsOnPageWithClanRow.map(({ uuid, ...record }, indexRecord) => (
            <Record
              key={uuid}
              header={header}
              rowsBtn={rowsBtn}
              indexRecord={indexRecord}
              rowCssClass={rowCssClass}
              recordAttributes={recordAttributes}
              recordStyles={recordStyles}
              record={record}
            />
          ))}
        </div>
      </TableContainer>

      <BottomBar
        pageCount={getPageCount}
        pageCurrent={getPageCurrent}
        setPageHandler={wrapperSetPageHandler}
        controlPanel={controlPanel}
      />
    </div>
  );
};

Table.defaultProps = {
  list: [],
  header: {},
  rowsBtn: [],
};

Table.propTypes = {
  /* title: PropTypes.any, */
  rowCssClass: PropTypes.func,
  list: PropTypes.instanceOf(Array),
  header: PropTypes.instanceOf(Object),
  rowsBtn: PropTypes.instanceOf(Array),
  controlPanel: PropTypes.instanceOf(Array),
  custom: PropTypes.bool,
  onFilterHandler: (props, propName) => {
    if (
      props.custom &&
      (!props[propName] || typeof props[propName] !== "function")
    ) {
      return new Error(
        `Если установлено свойство custom, то необходимо определить метод ${propName}`
      );
    }
  },
  onOrderHandler: (props, propName) => {
    if (
      props.custom &&
      (!props[propName] || typeof props[propName] !== "function")
    ) {
      return new Error(
        `Если установлено свойство custom, то необходимо определить метод ${propName}`
      );
    }
  },
  onPageHandler: (props, propName) => {
    if (
      props.custom &&
      (!props[propName] || typeof props[propName] !== "function")
    ) {
      return new Error(
        `Если установлено свойство custom, то необходимо определить метод ${propName}`
      );
    }
  },
};

export default withContext(
  RecordProvider,
  ({ onRowClick, onUnselectRecord, list }) => ({
    onRowClick,
    onUnselectRecord,
    list,
  })
)(Table);
