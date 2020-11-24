import React from "react";
import { mount } from "enzyme";
import Paging from "./Paging";

describe("Paging", () => {
  let wrapper;

  const getByDataId = (wrapper, dataId) =>
    wrapper.find(`[data-test-id="${dataId}"]`);

  const FirstPage = () => getByDataId(wrapper, "paging-first-page");
  const Prev = () => getByDataId(wrapper, "paging-prev");
  const Input = () => getByDataId(wrapper, "paging-input");
  const Next = () => getByDataId(wrapper, "paging-next");
  const LastPage = () => getByDataId(wrapper, "paging-last-page");

  beforeEach(() => {
    wrapper = mount(<Paging />);
  });

  it("should render", () => {
    expect(wrapper).toHaveLength(1);
  });

  it("should beginning parameters", () => {
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
  });
});
