import * as React from 'react';
import { browserHistory, Router, Route, IndexRoute } from 'react-router';

/* Pages */
import Home from './pages/Home';
import Layout from './pages/Layout';
import NotFound from './pages/NotFound';

export default function routes() {
  return (
    <Router history={browserHistory}>
      <Route path="/" component={Layout}>
        <IndexRoute component={Home} />
        {/* TODO: add more page routes here */}
        <Route path="*" component={NotFound} />
      </Route>
    </Router>
  );
}
