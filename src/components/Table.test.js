import React from "react";
import { mount } from "enzyme";
import Table from "./Table";

describe("Table", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(<Table />);
  });

  it("should render", () => {
    expect(wrapper).toHaveLength(1);
  });
});
