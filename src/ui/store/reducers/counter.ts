import { newAsyncDataReducer } from "clever-frontend-utils";
import { handleActions } from "redux-actions";
import * as actions from "../actions";

export const incrementCounter = handleActions({
  [actions.incrementCounter]: newAsyncDataReducer(
    (state, action) => action.payload,
  ),
}, { data: { value: 0 }});
