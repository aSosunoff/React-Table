import React from "react";
import { mount } from "enzyme";
import ControlPanel from "./ControlPanel";

describe("ControlPanel", () => {
  let wrapper;

  const getByDataId = (wrapper, dataId) =>
    wrapper.find(`[data-test-id="${dataId}"]`);

  const ControlPanelContainer = () => getByDataId(wrapper, "control-panel");

  beforeEach(() => {
    wrapper = mount(<ControlPanel />);
  });

  it("should render", () => {
    expect(wrapper).toHaveLength(1);
  });

  it("should not be render container", () => {
    expect(ControlPanelContainer()).toHaveLength(0);
  });

  it("should be contain buttons with function", () => {
    const controlPanel = [
      {
        title: "Test",
        handler: jest.fn(),
      },
      {
        title: "Test2",
        handler: jest.fn(),
        disabled: true,
      },
      {
        title: "Test3",
        handler: jest.fn(),
      },
    ];

    wrapper.setProps({
      controlPanel,
    });

    ControlPanelContainer()
      .children()
      .forEach((child, index) => {
        const { title, disabled, handler } = controlPanel[index];

        expect(child.text()).toBe(title);
        child.simulate("click");
        if (disabled) {
          expect(handler).not.toHaveBeenCalled();
        } else {
          expect(handler).toHaveBeenCalled();
        }
      });
  });
});
