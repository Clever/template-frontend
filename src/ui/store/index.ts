import { enableBatching } from "clever-frontend-utils";
import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import { devToolsEnhancer } from "redux-devtools-extension/developmentOnly";
import thunkMiddleware from "redux-thunk";

import * as reducers from "./reducers";

const appReducer = enableBatching(combineReducers({ ...reducers }));
export const store = createStore(appReducer, compose(
  applyMiddleware(thunkMiddleware),
  devToolsEnhancer({}),
));
