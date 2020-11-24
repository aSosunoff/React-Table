import React from "react";
import { mount } from "enzyme";
import Title from "./Title";

describe("Title", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(<Title />);
  });

  it("should render", () => {
    expect(wrapper).toHaveLength(1);
  });

  it("should render without title", () => {
    expect(wrapper.find("div")).toHaveLength(0);
  });

  it("should render with string title", () => {
    const title = "test title";
    wrapper.setProps({ children: title });
    expect(wrapper.find("div")).toHaveLength(1);
    expect(wrapper.find("div").text()).toBe(title);
  });

  it("should render with component title", () => {
    const title = "test title";
    wrapper.setProps({ children: <div className="test">{title}</div> });
    expect(wrapper.find(".test")).toHaveLength(1);
    expect(wrapper.find(".test").text()).toBe(title);
  });
});
