import { newAsyncDataSelectors } from "clever-frontend-utils";

const {
  item: incrementCounter,
} = newAsyncDataSelectors("incrementCounter", { itemDefault: {} });

export {
  incrementCounter,
};
