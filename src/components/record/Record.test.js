import React from "react";
import { mount } from "enzyme";
import Record from "./Record";

jest.mock("../../context/recordContext");

describe("Record", () => {
  let wrapper;

  const getRecordContextMock = () => require("../../context/recordContext");

  /* const getByDataId = (wrapper, dataId) =>
    wrapper.find(`[data-test-id="${dataId}"]`); */

  const RecordNode = () => wrapper.childAt(0);

  const context = {
    rowClickHandler: jest.fn(),
    selectedRowId: 1,
  };

  beforeEach(() => {
    getRecordContextMock().useRecordContext.mockImplementation(() => context);

    wrapper = mount(<Record />);
  });

  it("should render", () => {
    expect(wrapper).toHaveLength(1);
  });

  it("should be call rowHandler after click to record", () => {
    const rowClickHandler = jest.fn();

    getRecordContextMock().useRecordContext.mockImplementation(() => ({
      ...context,
      rowClickHandler,
    }));

    wrapper = mount(<Record />);

    RecordNode().simulate("click");

    const [[result]] = rowClickHandler.mock.calls;
    expect(result).toBeNull();
  });

  it("should be contain Cells", () => {
    const header = { some_field_1: {}, some_field_2: {} };

    wrapper.setProps({ header });

    expect(wrapper.find("Cell")).toHaveLength(Object.keys(header).length);
  });

  it("should be contain Btns", () => {
    const rowsBtn = [{ some_field_1: {} }];

    wrapper.setProps({ rowsBtn });

    expect(wrapper.find("Btn")).toHaveLength(Object.keys(rowsBtn).length);
  });

  it("should be contain class", () => {
    const classString = "classString";
    const rowCssClass = jest.fn((record) => record.some_field_1);
    const record = { some_field_1: classString };

    wrapper.setProps({ rowCssClass, record });

    const [[result]] = rowCssClass.mock.calls;
    expect(result).toEqual(record);

    expect(wrapper.childAt(0).hasClass(classString)).toBeTruthy();
  });
});
