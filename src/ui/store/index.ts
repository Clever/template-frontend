import { enableBatching } from "clever-frontend-utils";
import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import { devToolsEnhancer } from "redux-devtools-extension/developmentOnly";
import thunkMiddleware from "redux-thunk";

import * as counter from "./counter";

const appReducer = enableBatching(
  combineReducers({
    [counter.storeKey]: counter.reducer,
  }),
);

export const store = createStore(
  appReducer,
  compose(applyMiddleware(thunkMiddleware), devToolsEnhancer({})),
);

export const selectors = {
  ...counter.selectors,
};

export const actions = {
  ...counter.actions,
};
