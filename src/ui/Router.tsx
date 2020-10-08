import * as React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

/* Pages */
import { Home } from "./pages/Home";
import { Layout } from "./pages/Layout";
import { NotFound } from "./pages/NotFound";

export default function routes() {
  return (
    <BrowserRouter>
      <Route path="/" component={Layout} />
      <Switch>
        <Route path="/" exact component={Home} />
        {/* TODO: add more page routes here */}
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
}
