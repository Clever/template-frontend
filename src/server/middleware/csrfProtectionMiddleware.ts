import * as express from "express";
import * as kayvee from "kayvee";
import * as url from "url";

import * as config from "src/server/config";

// Use a one-off logger rather than req.log since it's defined in middleware that may not run
// before this middleware
const logger = new kayvee.Logger(config.APP_NAME);

/**
 * CSRF protection - ensure that state changing requests originate from us (our origin) or, as a
 * fallback, that the referer's host matches. This is based on the recommendations here:
 * https://www.owasp.org/index.php/Cross-Site_Request_Forgery_(CSRF)_Prevention_Cheat_Sheet
 *
 * CSRF protection verifies that the request originates from a place we expect.
 * Defining it as middleware that's applied before every request ensures
 * the check fires off before we route anywhere in the application.
 *
 * TODO(template-frontend): Add this middleware to an external library and refactor existing
 * frontend applications to use the library middleware instead of a copy of the middleware.
 */
export const csrfProtectionMiddleware = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  if (["POST", "PATCH", "DELETE", "PUT"].includes(req.method)) {
    const parsedAppURL = url.parse(config.APP_URL);
    const expectedOrigin = `${parsedAppURL.protocol}//${parsedAppURL.host}`;
    if (req.headers.origin) {
      if (req.headers.origin === expectedOrigin) {
        next();
        return;
      }
    } else if (typeof req.headers.referer === "string") {
      // IE11 and Edge do not send origin headers by default for same-origin requests, so fall
      // back to the referer.
      const { host, protocol } = url.parse(req.headers.referer);
      if (`${protocol}//${host}` === expectedOrigin) {
        next();
        return;
      }
    }
    logger.warnD("csrf-failure", {
      agent: req.headers["user-agent"],
      method: req.method,
      origin: req.headers.origin,
      referer: req.headers.referer,
      url: req.url,
    });
    res.sendStatus(403); // eslint-disable-line @clever/no-send-status-error
  } else {
    next();
  }
};
