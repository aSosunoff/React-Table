import React from "react";
import { mount } from "enzyme";
import Text from "./Text";

jest.mock("react");

describe("Text", () => {
  let wrapper;

  const getReactMock = () => require("react");
  const getRequireActual = () => jest.requireActual("react");

  const getByDataId = (wrapper, dataId) =>
    wrapper.find(`[data-test-id="${dataId}"]`);

  const Input = () => getByDataId(wrapper, "input");

  beforeEach(() => {
    const reactMock = getReactMock();
    const reactActual = getRequireActual();

    for (const key in reactMock) {
      if (reactMock[key].mockImplementation) {
        reactMock[key].mockImplementation(reactActual[key]);
      }
    }

    wrapper = mount(<Text />);
  });

  it("should render", () => {
    expect(wrapper).toHaveLength(1);
  });

  it("should be call onSet after keyup Enter", () => {
    const onSet = jest.fn();
    const value = 2;
    wrapper.setProps({
      onSet,
    });
    Input().simulate("keyup", { key: "Enter", target: { value } });
    const [[page]] = onSet.mock.calls;
    expect(page).toBe(value);
  });

  it("should be set local state", () => {
    const setValueLocal = jest.fn();
    getReactMock().useState.mockImplementation((value) => [
      value,
      setValueLocal,
    ]);

    getReactMock().useEffect.mockImplementation(() => null);

    wrapper = mount(<Text />);

    const value = 2;

    Input().simulate("change", { target: { value } });
    const [[page]] = setValueLocal.mock.calls;
    expect(page).toBe(value);
  });

  it("should", () => {
    const setValueLocal = jest.fn();
    getReactMock().useState.mockImplementation((value) => [
      value,
      setValueLocal,
    ]);

    getReactMock().useEffect.mockImplementation(() => null);

    wrapper = mount(<Text />);

    const value = 2;

    Input().simulate("change", { target: { value } });
    const [[page]] = setValueLocal.mock.calls;
    expect(page).toBe(value);
  });
});
