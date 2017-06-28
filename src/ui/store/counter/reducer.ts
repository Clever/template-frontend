// TODO: remove this file once actual reducers have been written

import { handleActions, createAction } from 'redux-actions';

export const storeKey = 'counter';

export const actions = {
  incrementCounter: createAction(`${storeKey}--INCREMENT`),
};

export const reducer = handleActions(
  {
    [actions.incrementCounter]: (state, action) => ({
      ...state, value: state.value + 1,
    }),
  },
  {
    value: 0,
  },
);
