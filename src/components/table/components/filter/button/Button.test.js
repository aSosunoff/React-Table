import React from "react";
import { mount } from "enzyme";
import Button from "./Button";

describe("Button", () => {
  let wrapper;

  const getByDataId = (wrapper, dataId) =>
    wrapper.find(`[data-test-id="${dataId}"]`);

  const ClearButton = () => getByDataId(wrapper, "button-clear-button");
  const Title = () => getByDataId(wrapper, "button-title");
  const Icon = () => getByDataId(wrapper, "button-icon");

  beforeEach(() => {
    wrapper = mount(<Button />);
  });

  it("should render", () => {
    expect(wrapper).toHaveLength(1);
  });

  it("should be render hide clear button after beginning", () => {
    expect(ClearButton()).toHaveLength(0);
  });

  it("should be render show clear button after beginning", () => {
    wrapper.setProps({
      value: {
        value: 1,
      },
    });

    expect(ClearButton()).toHaveLength(1);
  });

  it("should be contain title by value", () => {
    const value = {
      value: "1",
    };

    wrapper.setProps({
      value,
    });

    expect(Title().text()).toBe(value.value);
  });

  it("should be contain title by title", () => {
    const value = {
      value: "1",
      title: "test",
    };

    wrapper.setProps({
      value,
    });

    expect(Title().text()).toBe(value.title);
  });

  it("should be call handler after click to icon button and call onSet aftes call handler", () => {
    const target = 1;
    const handler = jest.fn();
    const onSet = jest.fn();

    const value = 1;
    const additionalProperties = 2;

    wrapper.setProps({
      handler,
      onSet,
    });

    Icon().simulate("click", {
      target,
    });

    expect(handler).toHaveBeenCalled();
    const [[callback, resultTarget]] = handler.mock.calls;
    expect(resultTarget).toBe(target);

    callback(value, additionalProperties);

    const [[resultValue, resultAdditionalProperties]] = onSet.mock.calls;
    expect(resultValue).toBe(value);
    expect(resultAdditionalProperties).toBe(additionalProperties);
  });
});
