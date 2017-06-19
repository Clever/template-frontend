import { combineReducers, createStore } from 'redux';
import { devToolsEnhancer } from 'redux-devtools-extension/developmentOnly';

import * as counter from './counter/reducer';

export const reducer = combineReducers({
  [counter.storeKey]: counter.reducer,
});

export default createStore(reducer, devToolsEnhancer({}));
