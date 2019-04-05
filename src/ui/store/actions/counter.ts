import { createAction } from "redux-actions";
import * as selectors from "../selectors";

export const incrementCounter = createAction("INCREMENT_COUNTER");

// promise version of setTimeout
async function delay(seconds) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(), seconds * 1000);
  });
}

export const incrementCounterNow = () =>
  async (dispatch, getState) => {
    const currentState = getState();
    dispatch(incrementCounter({ value: selectors.counter(currentState).value + 1 }));
  };

export const incrementCounterInNSeconds = (seconds) =>
  async (dispatch, getState) => {
    await delay(seconds);
    dispatch(incrementCounterNow());
  };
