import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import * as React from "react";

import { withErrorBoundary } from "../errors";
import { Home } from "src/ui/pages/Home";
import { NotFound } from "src/ui/pages/NotFound";
import { store } from "src/ui/store";
import { UnknownError } from "src/ui/pages/UnknownError";

import "../App.less";

function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
}

function AppWithoutErrorBoundary() {
  return (
    <Provider store={store}>
      <Router />
    </Provider>
  );
}

export const App = withErrorBoundary(AppWithoutErrorBoundary, UnknownError);
