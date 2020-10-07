import * as React from "react";
import { render } from "@testing-library/react";

import { HomeView } from "./";

describe("Home", () => {
  it("Renders a header", () => {
    const result = render(
      <HomeView
        counter={0}
        incrementCounterNow={() => null}
        incrementCounterInNSeconds={() => null}
      />,
    );
    expect(result.getByText("Home")).toBeVisible();
  });
});
