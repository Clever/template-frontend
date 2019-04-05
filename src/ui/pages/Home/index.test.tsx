import * as React from "react";
import { shallow } from "enzyme";

import { store } from "../../store";
import { HomeView } from "./";

// TODO: add more UI tests for rendered Home page

describe("HomeView", () => {
  it("renders a header", () => {
    const rendered = shallow(
      <HomeView counter={{}} incrementCounter={{}} incrementCounterInNSeconds={{}} />
    );
    expect(rendered.find("h1").length).toBe(1);
  });
});
