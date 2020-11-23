import React from "react";
import { mount } from "enzyme";
import Btn from "./Btn";

describe("Btn", () => {
  let wrapper;

  const getByDataId = (wrapper, dataId) =>
    wrapper.find(`[data-test-id="${dataId}"]`);

  const Button = () => getByDataId(wrapper, "btn-button");
  const ButtonDefault = () => getByDataId(wrapper, "btn-default-button");

  beforeEach(() => {
    wrapper = mount(<Btn />);
  });

  it("should render", () => {
    expect(wrapper).toHaveLength(1);
  });

  it("should be render default button", () => {
    expect(Button()).toHaveLength(0);
    expect(ButtonDefault()).toHaveLength(1);
  });

  it("should be render button", () => {
    wrapper.setProps({
      record: {
        id: {},
      },
      btn: {
        some_field: null,
      },
    });
    expect(Button()).toHaveLength(1);
    expect(ButtonDefault()).toHaveLength(0);
  });

  it("should be disabled", () => {
    wrapper.setProps({
      record: {
        id: {},
      },
      btn: {
        disabled: true,
      },
    });
    expect(Button().hasClass("disabled")).toBeTruthy();

    wrapper.setProps({
      btn: {
        disabled: false,
      },
    });
    expect(Button().hasClass("disabled")).toBeFalsy();

    wrapper.setProps({
      btn: {
        disabled: () => true,
      },
    });
    expect(Button().hasClass("disabled")).toBeTruthy();

    wrapper.setProps({
      btn: {
        disabled: () => false,
      },
    });
    expect(Button().hasClass("disabled")).toBeFalsy();
  });
});
