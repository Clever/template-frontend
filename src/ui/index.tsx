import * as React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";

import { store } from "./store";
import Router from "./Router";

render(
  <Provider store={store}>
    <Router />
  </Provider>,
  document.getElementById("__REACT_APP__"),
);
