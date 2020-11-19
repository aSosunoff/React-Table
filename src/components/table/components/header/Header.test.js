import React from "react";
import { mount } from "enzyme";
import Header from "./Header";

describe("Header", () => {
  let wrapper;

  const getByDataId = (wrapper, dataId) =>
    wrapper.find(`[data-test-id="${dataId}"]`);

  beforeEach(() => {
    wrapper = mount(<Header />);
  });

  it("should render", () => {
    expect(wrapper).toHaveLength(1);
  });

  it("should be render name property as default", () => {
    const header = {
      id: {},
      name: {},
      type: {},
    };

    wrapper.setProps({
      header,
    });

    getByDataId(wrapper, "header-name")
      .map((head) => head.text())
      .forEach((key, index) => {
        expect(key).toBe(Object.keys(header)[index]);
      });
  });

  it("should be render name property from titleHead", () => {
    const header = {
      id: {
        titleHead: "Номер",
      },
      name: {
        titleHead: "Наименование",
      },
      type: {
        titleHead: "Тип",
      },
    };

    wrapper.setProps({
      header,
    });

    getByDataId(wrapper, "header-name")
      .map((head) => head.text())
      .forEach((key, index) => {
        expect(key).toBe(
          Object.values(header).map(({ titleHead }) => titleHead)[index]
        );
      });
  });

  it("should not be render arrow", () => {
    const header = {
      id: {},
    };

    wrapper.setProps({
      header,
    });

    expect(getByDataId(wrapper, "header-sortable")).toHaveLength(0);

    expect(
      getByDataId(wrapper, "header-cell")
        .getDOMNode()
        .hasAttribute("data-sortable")
    ).toBeFalsy();
  });

  it("should be render arrow", () => {
    const header = {
      id: {
        order: true,
      },
    };

    const onOrder = jest.fn();

    wrapper.setProps({
      header,
      onOrder,
    });

    expect(getByDataId(wrapper, "header-sortable")).toHaveLength(1);

    expect(
      getByDataId(wrapper, "header-cell")
        .getDOMNode()
        .hasAttribute("data-sortable")
    ).toBeTruthy();
  });

  it("should be call onOrder with id parameter", () => {
    const propCell = "id";

    const header = {
      [propCell]: {
        order: true,
      },
    };

    const onOrder = jest.fn();

    wrapper.setProps({
      header,
      onOrder,
    });

    getByDataId(wrapper, "header-cell").simulate("click");
    expect(onOrder).toHaveBeenCalled();
    const [[prop]] = onOrder.mock.calls;
    expect(prop).toBe(propCell);

    expect(
      getByDataId(wrapper, "header-cell")
        .getDOMNode()
        .hasAttribute("data-sortable")
    ).toBeTruthy();
  });

  it("should be set direction", () => {
    const propCell = "id";

    const direction = "asc";

    const header = {
      [propCell]: {
        order: true,
      },
    };

    wrapper.setProps({
      header,
      prop: propCell,
      direction,
    });

    expect(
      getByDataId(wrapper, "header-cell").is(`[data-order="${direction}"]`)
    ).toBeTruthy();
  });

  it("should not be set direction", () => {
    const propCell = "id";

    const header = {
      [propCell]: {
        order: true,
      },
    };

    wrapper.setProps({
      header,
      prop: "another_name",
    });

    expect(
      getByDataId(wrapper, "header-cell")
        .getDOMNode()
        .hasAttribute("data-order")
    ).toBeFalsy();
  });
});
