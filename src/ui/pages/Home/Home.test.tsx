import * as React from "react";
import { render } from "@testing-library/react";

import { HomeUnwrapped } from "./";

describe("Home", () => {
  it("Renders a header", () => {
    const result = render(
      <HomeUnwrapped
        counter={0}
        incrementCounterNow={() => null}
        incrementCounterInNSeconds={() => null}
      />,
    );
    expect(result.getByText("Home")).toBeVisible();
  });
});
