import * as React from "react";
import { connect } from "react-redux";
import { Button } from "clever-components";
import { actions, selectors } from "../../store";

import "./index.less";

export function HomeView({
  counter,
  incrementCounterNow,
  incrementCounterInNSeconds,
}) {
  return (
    <div className="pages--Home">
      <h1>Home</h1>
      <p>Hello world! I'm a single page app.</p>
      <section>
        <h2>The current value of the counter is {counter}</h2>
        <div>
          <Button
            onClick={() => incrementCounterNow()}
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
  incrementCounterNow: actions.incrementCounterNow,
  incrementCounterInNSeconds: actions.incrementCounterInNSeconds,
};

export const Home = connect(mapStateToProps, mapDispatchToProps)(HomeView);
