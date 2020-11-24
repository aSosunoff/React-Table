import React from "react";
import { mount } from "enzyme";
import Table from "./Table";

describe("Table", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(
      <Table
        /* list={[
          {
            id: 2,
            text: "aa",
            name: "bb",
          },
        ]}
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
        }} */
      />
    );
  });

  it("should render", () => {
    expect(wrapper).toHaveLength(1);
  });
});
