// TODO: remove this file once actual reducers have been written

import { storeKey, actions } from './reducer';

export const selectors = {
  value: state => state[storeKey].value,
};

// promise version of setTimeout
async function delay(seconds) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(), seconds * 1000);
  });
}

export function incrementCounterNow(dispatch) {
  dispatch(actions.incrementCounter());
}

export async function incrementCounterInNSeconds(dispatch, seconds = 1) {
  await delay(seconds);
  dispatch(actions.incrementCounter());
}
