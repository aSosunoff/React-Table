import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

const RecordContext = createContext();
RecordContext.displayName = "RecordContext";

export const useRecordContext = () => useContext(RecordContext);

export const RecordProvider = ({
  list,
  onRowClick = () => null,
  onUnselectRecord = () => null,
  children,
}) => {
  const [selectedRowId, setSelectedRowId] = useState(null);

  const selectedRecordClearHandler = useCallback(
    () => setSelectedRowId(null),
    []
  );

  useEffect(() => {
    selectedRecordClearHandler();
  }, [list, selectedRecordClearHandler]);

  const rowClickHandler = useCallback(
    (indexRecord, record) => {
      if (selectedRowId !== indexRecord && indexRecord !== null) {
        onRowClick(record);
        setSelectedRowId(indexRecord);
      } else if (indexRecord === null) {
        onUnselectRecord();
        selectedRecordClearHandler();
      }
    },
    [
      selectedRowId,
      onRowClick,
      setSelectedRowId,
      onUnselectRecord,
      selectedRecordClearHandler,
    ]
  );

  return (
    <RecordContext.Provider
      value={{
        selectedRowId,
        selectedRecordClearHandler,
        rowClickHandler,
      }}
    >
      {children}
    </RecordContext.Provider>
  );
};
