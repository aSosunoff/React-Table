import React from "react";
import { mount } from "enzyme";
import List from "./List";

describe("List", () => {
  let wrapper;

  const getByDataId = (wrapper, dataId) =>
    wrapper.find(`[data-test-id="${dataId}"]`);

  const Select = () => wrapper.find("select");
  const ClearButton = () => getByDataId(wrapper, "list-clear-button");

  beforeEach(() => {
    wrapper = mount(<List />);
  });

  it("should render", () => {
    expect(wrapper).toHaveLength(1);
  });

  it("should be render hide clear button after beginning", () => {
    expect(ClearButton()).toHaveLength(0);
  });

  it("should be render show clear button after beginning", () => {
    wrapper.setProps({ value: 1 });
    expect(ClearButton()).toHaveLength(1);
  });

  it("should be contain items", () => {
    const items = [
      {
        id: 1,
        text: "test1",
      },
      {
        id: 2,
        text: "test2",
      },
    ];

    wrapper.setProps({
      items,
    });

    Select()
      .children()
      .forEach((option, index) => {
        if (index === 0) {
          expect(option.prop("value")).toBe("-1");
          expect(option.text()).toBe("Выберите");
        } else {
          const { id, text } = items[index - 1];

          expect(option.prop("value")).toBe(id);
          expect(option.text()).toBe(text);
        }
      });
  });

  it("should be render with selected item", () => {
    const items = [
      {
        id: 1,
        text: "test1",
      },
      {
        id: 2,
        text: "test2",
      },
    ];

    expect(Select().getDOMNode().options.selectedIndex).toBe(0);

    wrapper.setProps({
      value: items[1].id,
      items,
    });

    expect(Select().getDOMNode().options.selectedIndex).toBe(items[1].id);
    expect(
      Select().getDOMNode().options[Select().getDOMNode().options.selectedIndex]
        .innerHTML
    ).toBe(items[1].text);
  });

  it("should be call onClear after selected default value", () => {
    const onClear = jest.fn();

    wrapper.setProps({
      onClear,
    });

    Select().simulate("change", {
      target: {
        options: {
          1: { value: "-1" },
          selectedIndex: 1,
        },
      },
    });

    expect(onClear).toHaveBeenCalled();
  });

  it("should be call onSet after change value", () => {
    const onSet = jest.fn();
    const value = 1;

    wrapper.setProps({
      onSet,
    });

    Select().simulate("change", {
      target: {
        options: {
          1: { value, dataset: {} },
          selectedIndex: 1,
        },
      },
    });

    expect(onSet).toHaveBeenCalled();
    const [[result]] = onSet.mock.calls;
    expect(result).toBe(value);
  });

  it("should be call onClear and set start index to select", () => {
    const onClear = jest.fn();

    wrapper.setProps({ value: 1, onClear });

    const target = {
      previousElementSibling: {
        selectedIndex: 1,
      },
    };

    ClearButton().simulate("click", {
      target,
    });

    expect(onClear).toHaveBeenCalled();
    expect(target.previousElementSibling.selectedIndex).toBe(0);
  });
});
