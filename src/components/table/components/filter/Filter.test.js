import React from "react";
import { mount } from "enzyme";
import Filter from "./Filter";

describe("Text", () => {
  let wrapper;

  const getByDataId = (wrapper, dataId) =>
    wrapper.find(`[data-test-id="${dataId}"]`);

  const FilterContainer = () => getByDataId(wrapper, "filter-container");
  const ClearButton = () => getByDataId(wrapper, "filter-clear-button");
  const FilterDefault = () => getByDataId(wrapper, "filter-default");

  beforeEach(() => {
    wrapper = mount(<Filter />);
  });

  it("should render", () => {
    expect(wrapper).toHaveLength(1);
  });

  it("should not be filter container", () => {
    expect(FilterContainer()).toHaveLength(0);
  });

  /* Test component */
  it("should be contain Text component", () => {
    wrapper.setProps({
      filterPanel: {
        id: {
          type: "text",
        },
      },
    });

    expect(wrapper.find("Text")).toHaveLength(1);
  });

  it("should be call onSetFilter after call onSet event by Text component", () => {
    const onSetFilter = jest.fn();
    const args = [1, 2, 3];
    const fieldName = "id";

    wrapper.setProps({
      filterPanel: {
        [fieldName]: {
          type: "text",
        },
      },
      onSetFilter,
    });

    wrapper.find("Text").prop("onSet")(...args);
    const [[resultFieldName, ...resultArgs]] = onSetFilter.mock.calls;
    expect(resultFieldName).toBe(fieldName);
    expect(resultArgs).toEqual(args);
  });

  it("should be call onClear by Text component", () => {
    const onDeleteFromFilterByField = jest.fn();
    const args = [1, 2, 3];
    const fieldName = "id";

    wrapper.setProps({
      filterPanel: {
        [fieldName]: {
          type: "text",
        },
      },
      onDeleteFromFilterByField,
    });

    wrapper.find("Text").prop("onClear")(...args);
    const [
      [resultFieldName, ...resultArgs],
    ] = onDeleteFromFilterByField.mock.calls;
    expect(resultFieldName).toBe(fieldName);
    expect(resultArgs).toEqual(args);
  });
  /*  */

  /* List component */
  it("should be contain List component", () => {
    wrapper.setProps({
      filterPanel: {
        id: {
          type: "list",
        },
      },
    });

    expect(wrapper.find("List")).toHaveLength(1);
  });

  it("should be call onSetFilter after call onSet event by List component", () => {
    const onSetFilter = jest.fn();
    const args = [1, 2, 3];
    const fieldName = "id";

    wrapper.setProps({
      filterPanel: {
        [fieldName]: {
          type: "list",
        },
      },
      onSetFilter,
    });

    wrapper.find("List").prop("onSet")(...args);
    const [[resultFieldName, ...resultArgs]] = onSetFilter.mock.calls;
    expect(resultFieldName).toBe(fieldName);
    expect(resultArgs).toEqual(args);
  });

  it("should be call onClear by List component", () => {
    const onDeleteFromFilterByField = jest.fn();
    const args = [1, 2, 3];
    const fieldName = "id";

    wrapper.setProps({
      filterPanel: {
        [fieldName]: {
          type: "list",
        },
      },
      onDeleteFromFilterByField,
    });

    wrapper.find("List").prop("onClear")(...args);
    const [
      [resultFieldName, ...resultArgs],
    ] = onDeleteFromFilterByField.mock.calls;
    expect(resultFieldName).toBe(fieldName);
    expect(resultArgs).toEqual(args);
  });
  /*  */

  /* Button component */
  it("should be contain Button component", () => {
    wrapper.setProps({
      filterPanel: {
        id: {
          type: "button",
        },
      },
    });

    expect(wrapper.find("Button")).toHaveLength(1);
  });

  it("should be call onSetFilter after call onSet event by Button component", () => {
    const onSetFilter = jest.fn();
    const args = [1, 2, 3];
    const fieldName = "id";

    wrapper.setProps({
      filterPanel: {
        [fieldName]: {
          type: "button",
        },
      },
      onSetFilter,
    });

    wrapper.find("Button").prop("onSet")(...args);
    const [[resultFieldName, ...resultArgs]] = onSetFilter.mock.calls;
    expect(resultFieldName).toBe(fieldName);
    expect(resultArgs).toEqual(args);
  });

  it("should be call onClear by Button component", () => {
    const onDeleteFromFilterByField = jest.fn();
    const args = [1, 2, 3];
    const fieldName = "id";

    wrapper.setProps({
      filterPanel: {
        [fieldName]: {
          type: "button",
        },
      },
      onDeleteFromFilterByField,
    });

    wrapper.find("Button").prop("onClear")(...args);
    const [
      [resultFieldName, ...resultArgs],
    ] = onDeleteFromFilterByField.mock.calls;
    expect(resultFieldName).toBe(fieldName);
    expect(resultArgs).toEqual(args);
  });
  /*  */

  /* component default */
  it("should be contain default component", () => {
    wrapper.setProps({
      filterPanel: {
        id: {
          type: "some_type",
        },
      },
    });

    expect(FilterDefault()).toHaveLength(1);
  });
  /*  */

  it("should be call onClearFilter after click clear button", () => {
    const onClearFilter = jest.fn();

    wrapper.setProps({
      filterPanel: {},
      onClearFilter,
    });

    ClearButton().simulate("click");

    expect(onClearFilter).toHaveBeenCalled();
  });
});
