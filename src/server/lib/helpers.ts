import * as url from "url";

/**
 * TODO: This helper function may not work for proxy-fronted
 * services (see launchpad fronted by clever-com-router),
 * so replace code as needed to retrieve URL correctly.
 */
export function getAppURL() {
  const isLocal = process.env.HOST === "localhost";
  const appURL = url.format({
    protocol: isLocal ? "http" : "https",
    hostname: process.env.HOST,
    port: isLocal ? process.env.PORT : undefined,
  });
  return appURL;
}
