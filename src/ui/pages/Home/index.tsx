import * as React from 'react';
import * as PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button } from 'clever-components';

import {
  selectors as counterSelectors,
  incrementCounterNow,
  incrementCounterInNSeconds,
} from '../../store/counter';

import './index.less';

export function HomeView({
  counterValue,
  incrementCounter,
  incrementCounterInOneSecond,
}) {
  // TODO: flesh out true home page
  return (
    <div className="pages--Home">
      <h1>Home</h1>
      <p>Hello world! I'm a single page app.</p>
      <section>
        <h2>The current value of the counter is {counterValue}</h2>

        <div>
          <Button
            onClick={incrementCounter}
            value="Increment counter now"
            type="primary"
          />
          <Button
            onClick={incrementCounterInOneSecond}
            value="Increment counter in a second"
            type="secondary"
          />
        </div>
      </section>
    </div>
  );
}

HomeView.propTypes = {
  counterValue: PropTypes.number,
  incrementCounter: PropTypes.func.isRequired,
  incrementCounterInOneSecond: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    counterValue: counterSelectors.value(state),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    incrementCounter: () => incrementCounterNow(dispatch),
    incrementCounterInOneSecond:
      async () => await incrementCounterInNSeconds(dispatch, 1),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeView);
