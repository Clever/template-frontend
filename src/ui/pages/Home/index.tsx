import * as React from "react";
import * as PropTypes from "prop-types";
import { connect, Provider } from "react-redux";
import { Button } from "clever-components";
import * as actions from "../../store/actions";
import * as selectors from "../../store/selectors";

import { store } from "../../store";

import "./index.less";

export function HomeView({
  counter,
  incrementCounter,
  incrementCounterInNSeconds,
}) {
  // TODO: flesh out true home page
  return (
    <div className="pages--Home">
      <h1>Home</h1>
      <p>Hello world! I'm a single page app.</p>
      <section>
        <h2>The current value of the counter is {counter.value}</h2>

        <div>
          <Button
            onClick={incrementCounter}
            value="Increment counter now"
            type="primary"
          />
          <Button
            onClick={() => incrementCounterInNSeconds(1)}
            value="Increment counter in a second"
            type="secondary"
          />
        </div>
      </section>
    </div>
  );
}


const mapStateToProps = (state) => ({
  counter: selectors.counter(state),
});

const mapDispatchToProps = {
  incrementCounter: actions.incrementCounterNow,
  incrementCounterInNSeconds: actions.incrementCounterInNSeconds,
};

export const Home = connect(mapStateToProps, mapDispatchToProps)(HomeView);
