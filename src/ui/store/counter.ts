import { createAction, handleActions } from "redux-actions";
import { newAsyncDataReducer, newAsyncDataSelectors } from "clever-frontend-utils";

// ========== Selectors ==========

const generatedSelectors = newAsyncDataSelectors("counter", { itemDefault: 0 });

export const selectors = {
  counter: generatedSelectors.item,
};

// ========== Actions ==========

const internalActions = {
  incrementCounter: createAction("INCREMENT_COUNTER"),
};

const incrementCounterNow = () => async (dispatch, getState) => {
  const currentState = getState();
  const newValue = selectors.counter(currentState) + 1;
  dispatch(internalActions.incrementCounter(newValue));
};

async function delay(seconds) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(), seconds * 1000);
  });
}

const incrementCounterInNSeconds = (seconds) => async (dispatch) => {
  await delay(seconds);
  dispatch(incrementCounterNow());
};

export const actions = {
  incrementCounterNow,
  incrementCounterInNSeconds,
};

// ========== Reducer ==========

export const storeKey = "counter";

export const reducer = handleActions(
  {
    [internalActions.incrementCounter]: newAsyncDataReducer(),
  },
  {},
);
