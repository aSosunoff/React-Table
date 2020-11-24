import React from "react";
import { mount } from "enzyme";
import Cell from "./Cell";

/* jest.mock("react"); */

describe("Cell", () => {
  let wrapper;

  /* const getReactMock = () => require("react");
  const getRequireActual = () => jest.requireActual("react"); */

  const getByDataId = (wrapper, dataId) =>
    wrapper.find(`[data-test-id="${dataId}"]`);

  const CellComponent = () => getByDataId(wrapper, "cell");
  const ValueTag = () => getByDataId(wrapper, "cell-value");

  beforeEach(() => {
    /* const reactMock = getReactMock();
    const reactActual = getRequireActual();

    for (const key in reactMock) {
      if (reactMock[key].mockImplementation) {
        reactMock[key].mockImplementation(reactActual[key]);
      }
    } */

    wrapper = mount(<Cell />);
  });

  it("should render", () => {
    expect(wrapper).toHaveLength(1);
    expect(CellComponent()).toHaveLength(1);
  });

  it("should be contains value as text", () => {
    const value = "test";

    wrapper.setProps({
      value,
    });

    expect(ValueTag().text()).toBe(value);
  });

  it("should be call clickHandler after click to value", () => {
    const clickHandler = jest.fn();

    wrapper.setProps({
      value: "some_value",
      clickHandler,
    });

    ValueTag().simulate("click");

    expect(clickHandler).toHaveBeenCalled();
  });

  it("should be contain attributes", () => {
    const attributes = {
      title: "title",
      "data-custom": "some_field",
    };

    wrapper.setProps({
      attributes,
    });

    expect(
      CellComponent().exists(`[title='${attributes.title}']`)
    ).toBeTruthy();

    expect(
      CellComponent().exists(`[data-custom='${attributes["data-custom"]}']`)
    ).toBeTruthy();

    expect(CellComponent().getDOMNode().dataset.custom).toBe(
      attributes["data-custom"]
    );
  });

  it("should be contain Btns", () => {
    const btns = [
      {
        uuid: 1,
      },
      {
        uuid: 2,
      },
    ];

    wrapper.setProps({
      value: true,
      btns,
    });

    expect(wrapper.find("Btn")).toHaveLength(btns.length);
  });

  it("should be contain props record and indexRecord to Btns", () => {
    const btns = [
      {
        uuid: 1,
      },
      {
        uuid: 2,
      },
    ];

    const record = {
      id: 1,
    };

    const indexRecord = 1;

    wrapper.setProps({
      value: true,
      btns,
      record,
      indexRecord,
    });

    wrapper.find("Btn").forEach((btn) => {
      expect(btn.prop("record")).toEqual(record);
      expect(btn.prop("indexRecord")).toBe(indexRecord);
    });
  });
});
