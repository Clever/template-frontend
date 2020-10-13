import { Button } from "clever-components";
import { connect } from "react-redux";
import * as React from "react";

import { actions, selectors } from "../../store";
import { Layout } from "src/ui/components/Layout";

import "./Home.less";

function cssClass(element: string): string {
  return `Home--${element}`;
}

interface Props {
  counter: number;
  incrementCounterNow: () => void;
  incrementCounterInNSeconds: (n: number) => void;
}

export function HomeUnwrapped({ counter, incrementCounterNow, incrementCounterInNSeconds }: Props) {
  return (
    <Layout windowTitle="Home">
      <h1>Home</h1>
      <p>Hello world! I’m a single page app.</p>
      <h2>The current value of the counter is {counter}</h2>
      <div className={cssClass("buttons")}>
        <Button
          onClick={() => incrementCounterNow()}
          type="primary"
          value="Increment counter now"
        />
        <Button
          onClick={() => incrementCounterInNSeconds(1)}
          type="secondary"
          value="Increment counter in a second"
        />
      </div>
    </Layout>
  );
}

const mapStateToProps = (state: any) => ({
  counter: selectors.counter(state),
});

const mapDispatchToProps = {
  incrementCounterNow: actions.incrementCounterNow,
  incrementCounterInNSeconds: actions.incrementCounterInNSeconds,
};

export const Home = connect(mapStateToProps, mapDispatchToProps)(HomeUnwrapped);
