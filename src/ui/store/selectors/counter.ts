import { newAsyncDataSelectors } from "clever-frontend-utils";

const {
  item: counter,
} = newAsyncDataSelectors("counter", { itemDefault: {} });

export {
  counter,
};
