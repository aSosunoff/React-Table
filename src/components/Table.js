import React, { useCallback, useMemo } from "react";
import { v4 } from "uuid";
import PropTypes from "prop-types";
import { cloneDeep } from "lodash";
import Header from "./header/Header";
import Title from "./title/Title";
import TableContainer from "./tableContainer";
import BottomBar from "./bottomBar/BottomBar";
import { usePagination } from "../hooks/usePagination";
import { useSorting } from "../hooks/useSortable";
import { useCleanRecord } from "../hooks/useCleanRecord";
import { usePropDirection } from "../hooks/usePropDirection";
import Filter from "./filter/Filter";
import { useFilter } from "../hooks/useFilter";
import { getStartOrderProp } from "../utils/getStartOrderProp";
import { withContext } from "../HOC/withContext";
import { RecordProvider, useRecordContext } from "../context/recordContext";
import Record from "./record";

const Table = ({
  title, // String
  rowCssClass, // Function(record) : String,
  list,
  header,
  /* NAME_PROPERTY: {
			titleHead: String,
			titleCell: Boolean | Function(value, record) : String,
			order: Object, // { type: 'string|number|date', direction: 'asc|desc'} | true
			width: Number,
			format: Function(value, record) : String,
			formatHTML: Function(value, record) : String,
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
  /* custom = false, */
  /* onOrderCustom = () => {}, */
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
    deleteFieldByFieldFromFilter,
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

  const { itemsOnPage, currentPage, pageCount, setPageHandler } = usePagination(
    pageSize,
    listLocalSorted
  );

  const itemsOnPageWithClanRow = useCleanRecord(itemsOnPage, pageSize);

  const wrapperSetPageHandler = useCallback(
    (page) => {
      selectedRecordClearHandler();
      setPageHandler(page);
    },
    [selectedRecordClearHandler, setPageHandler]
  );

  const wrapperSortHandler = useCallback(
    (prop) => {
      selectedRecordClearHandler();
      setPropDirectionHandler(prop);
    },
    [setPropDirectionHandler, selectedRecordClearHandler]
  );

  return (
    <div>
      <TableContainer header={header} rowsBtnLength={rowsBtn.length}>
        <Title>{title}</Title>

        {isFilter ? (
          <Header
            header={header}
            prop={prop}
            direction={direction}
            onOrder={wrapperSortHandler}
          />
        ) : null}

        <Filter
          filterState={filterState}
          filterPanel={filterPanel}
          onSetFilter={setFilterHandler}
          onDeleteFromFilterByField={deleteFieldByFieldFromFilter}
          onClearFilter={clearFilterHandler}
        />

        <div>
          {itemsOnPageWithClanRow.map(({ uuid, ...record }, indexRecord) => (
            <Record
              key={uuid}
              header={header}
              rowsBtn={rowsBtn}
              indexRecord={indexRecord}
              rowCssClass={rowCssClass}
              record={record}
            />
          ))}
        </div>
      </TableContainer>

      <BottomBar
        pageCount={pageCount}
        pageCurrent={currentPage}
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
};

export default withContext(
  RecordProvider,
  ({ onRowClick, onUnselectRecord, list }) => ({
    onRowClick,
    onUnselectRecord,
    list,
  })
)(Table);
