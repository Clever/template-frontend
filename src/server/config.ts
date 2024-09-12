import { discovery, external, discoveryMethod, externalMethod } from "clever-discovery";
import * as url from "url";

/**
 * Keep uses of `process.env` constrained to this file. This gives us a central place to parse,
 * provide fallbacks for, and export out environment variables.
 */

// Environment detection
export const IS_LOCAL = Boolean(process.env._IS_LOCAL); // Provided by deployment system
export const IS_PROD = process.env._DEPLOY_ENV === "production"; // Provided by deployment system
export const IS_TEST = Boolean(process.env.IS_TEST);

// In test environments, calls to discovery can fail due to undefined env vars. We swallow errors
// in those cases.
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function discoveryWrapper(service: string, expose: string, method: discoveryMethod) {
  try {
    return discovery(service, expose)[method]();
  } catch (err) {
    if (IS_TEST) {
      return "";
    }
    throw err;
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function externalUrlWrapper(url: string, method: externalMethod) {
  try {
    return external(url)[method]();
  } catch (err) {
    if (IS_TEST) {
      return "";
    }
    throw err;
  }
}

export const APP_NAME = process.env._APP_NAME || "{{.AppName}}"; // Provided by deployment system
export const HOST = process.env.HOST || "localhost";
export const PORT = Number(process.env.PORT) || 5021;
export const FAVICON_PATH = "/favicon.ico?1";
// TODO: Use this instead if serving assets via the CDN
// export const FAVICON_PATH = IS_LOCAL
//   ? "/favicon.ico?1"
//   : "https://assets.clever.com/{{.AppName}}/build/favicon.ico?1";

export const APP_URL = url.format({
  protocol: IS_LOCAL ? "http" : "https",
  hostname: HOST,
  port: IS_LOCAL ? PORT : undefined,
});
