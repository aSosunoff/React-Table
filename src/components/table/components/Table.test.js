import React from "react";
import { mount } from "enzyme";
import Table from "./Table";

describe("Table", () => {
  let wrapper;

  beforeEach(() => {
    try {
      wrapper = mount(
        <Table
          list={{
            id: 2,
            text: "aa",
            name: "bb",
          }}
          header={{
            id: {
              titleHead: "№",
            },
            text: {
              titleHead: "текст",
            },
            name: {
              titleHead: "имя",
            },
          }}
        />
      );
    } catch (e) {
      console.log(e);
    }
  });

  it("should render", () => {
    expect(wrapper).toHaveLength(1);
  });
});
