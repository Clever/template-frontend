import * as React from "react";
import {render} from "react-dom";
import {browserHistory, Router, Route, IndexRoute} from "react-router";
import "./App.less";

/* Pages */
import {Home} from "./home/Home";

class App extends React.Component<any, any> {
  constructor(props) {
    super(props);
  }

  render() {	
    return (
      <div>
      {this.props.children}
      </div>
    );
  }
}

function NotFound() {
  return (
    <div>
      Sorry, we couldn't find a page at this URL!
    </div>
  );
}

render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Home} />
      <Route path="*" component={NotFound} />
    </Route>
  </Router>
), document.getElementById("app"))
