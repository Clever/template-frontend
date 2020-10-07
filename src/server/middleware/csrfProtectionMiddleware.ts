import * as url from "url";

import { getAppURL } from "../lib/helpers";

/**
 * CSRF protection - ensure that state changing requests originate from us (our origin) or, as a
 * fallback, that the referer's host matches. This is based on the recommendations here:
 * https://www.owasp.org/index.php/Cross-Site_Request_Forgery_(CSRF)_Prevention_Cheat_Sheet
 *
 * CSRF protection verifies that the request originates from a place we expect.
 * Defining it as middleware that's applied before every request ensures
 * the check fires off before we route anywhere in the application.
 *
 * TODO: Add this middleware to an external library, and refactor existing frontend
 * applications to use the library middleware instead of their unique CSRF middleware.
 */
export const csrfProtectionMiddleware = (req, res, next) => {
  if (["POST", "PATCH", "DELETE", "PUT"].includes(req.method)) {
    const parsedAppURL = url.parse(getAppURL());
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
    /** TODO: Log CSRF failure 
      logger.warnD("csrf_failure", {
        method: req.method,
        url: req.url,
        origin: req.headers.origin,
        referer: req.headers.referer,
        agent: req.headers["user-agent"],
      });
      */
    res.sendStatus(403); // eslint-disable-line @clever/no-send-status-error
  } else {
    next();
  }
};
