import { polyfillMediaQueries } from "clever-components";

/**
 * A function to run on client-side app startup
 */
export function boot() {
  polyfillMediaQueries();
}
