import React from "react";
import { mount } from "enzyme";
import Text from "./Text";

describe("Text", () => {
  let wrapper;

  const getByDataId = (wrapper, dataId) =>
    wrapper.find(`[data-test-id="${dataId}"]`);

  const Input = () => getByDataId(wrapper, "input");

  beforeEach(() => {
    wrapper = mount(<Text />);
  });

  it("should render", () => {
    expect(wrapper).toHaveLength(1);
  });

  it("should", () => {
    const onSet = jest.fn();
    wrapper.setProps({
      onSet,
    });
    Input().simulate("keyup", { key: "Enter", target: { value: 2 } });
    const [[page]] = onSet.mock.calls;
    expect(page).toBe(2);
  });

  /* it("should beginning parameters", () => {
    expect(FirstPage().text()).toBe("1...");
    expect(Input().prop("value")).toBe(1);
    expect(Input().prop("disabled")).toBeTruthy();
    expect(LastPage().text()).toBe("...1");
  });

  it("should be render with page count above than 1", () => {
    wrapper.setProps({ pageCount: 2 });
    expect(Input().prop("disabled")).toBeFalsy();
    expect(LastPage().text()).toBe("...2");
  });

  it("should be render with page current above than 1", () => {
    wrapper.setProps({ pageCount: 2, pageCurrent: 2 });
    wrapper.update();
    expect(Input().prop("value")).toBe(2);
  });

  it("should be toggle page to next", () => {
    const setPageHandler = jest.fn();
    wrapper.setProps({ pageCount: 5, setPageHandler });
    Next().simulate("click");
    const [[page]] = setPageHandler.mock.calls;
    expect(page).toBe(2);
  });

  it("should be toggle page to prev", () => {
    const setPageHandler = jest.fn();
    wrapper.setProps({ pageCurrent: 2, pageCount: 2, setPageHandler });
    Prev().simulate("click");
    const [[page]] = setPageHandler.mock.calls;
    expect(page).toBe(1);
  });

  it("should be toggle page to last", () => {
    const setPageHandler = jest.fn();
    wrapper.setProps({ pageCount: 5, setPageHandler });
    LastPage().simulate("click");
    const [[page]] = setPageHandler.mock.calls;
    expect(page).toBe(5);
  });

  it("should be toggle page to first", () => {
    const setPageHandler = jest.fn();
    wrapper.setProps({ pageCurrent: 3, pageCount: 5, setPageHandler });
    FirstPage().simulate("click");
    const [[page]] = setPageHandler.mock.calls;
    expect(page).toBe(1);
  });

  it("should be set page from input", () => {
    const setPageHandler = jest.fn();
    const pageNew = 2;
    wrapper.setProps({ pageCount: 5, setPageHandler });
    Input().simulate("change", { target: { value: pageNew } });
    const [[page]] = setPageHandler.mock.calls;
    expect(page).toBe(pageNew);
  }); */
});
