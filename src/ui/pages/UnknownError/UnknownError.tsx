import * as React from "react";

import "./UnknownError.less";

function cssClass(element: string): string {
  return `UnknownError--${element}`;
}

/**
 * An intentionally simple fallback page for when the React app crashes and the top-level error
 * boundary kicks in.
 *
 * We don't even use the <Layout> component, which could, itself, fail.
 */
export function UnknownError() {
  return (
    <div className={cssClass("container")}>
      <p>Sorry! Something went wrong. Please try again later.</p>
    </div>
  );
}
