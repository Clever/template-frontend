import * as express from "express";
import { UAParser } from "ua-parser-js";

export const extractFieldsFromRequest = (req: express.Request) => ({
  ...extractIdentifiers(req),
  ...extractRouteDetails(req),
  ...extractUserAgentDetails(req),
});

export function extractIdentifiers(req: express.Request) {
  return {
    // TODO: Add relevant user identifiers, like session ID and user ID
  };
}

export function extractRouteDetails(req: express.Request) {
  return {
    method: req.method, // GET
    path: req.path, // /users/1234
    route: req.route && req.route.path, // /users/:id
  };
}

export function extractUserAgentDetails(req: express.Request) {
  const uaParser = new UAParser(req.headers["user-agent"]);
  const ua = uaParser.getResult();

  return {
    ua_browser: ua.browser && ua.browser.name,
    ua_browser_version: ua.browser && ua.browser.version,
    ua_device: ua.device && ua.device.model,
    ua_device_type: ua.device && ua.device.type,
    ua_os: ua.os && ua.os.name,
    ua_os_version: ua.os && ua.os.version,
  };
}
