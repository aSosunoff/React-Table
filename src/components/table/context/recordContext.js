import React, { createContext, useCallback, useContext, useState } from "react";

const RecordContext = createContext();
RecordContext.displayName = "RecordContext";

export const useRecordContext = () => useContext(RecordContext);

export const RecordProvider = ({ children }) => {
  const [selectedRowId, setSelectedRowId] = useState(null);

  const selectedRecordClearHandler = useCallback(
    () => setSelectedRowId(null),
    []
  );

  return (
    <RecordContext.Provider
      value={{ selectedRowId, selectedRecordClearHandler, setSelectedRowId }}
    >
      {children}
    </RecordContext.Provider>
  );
};
