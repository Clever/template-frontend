import * as express from "express";

/**
 * Takes a body parser middleware as input and returns a middleware that wraps the body parser,
 * but handles any user errors so that they don't get reported, e.g. to Sentry.
 */
export function bodyParserErrorHandler(bodyParserMiddleware: express.Handler): express.Handler {
  return (req, res, next) => {
    // Call the original middleware, but handle its errors
    bodyParserMiddleware(req, res, (err: any) => {
      if (err) {
        // For a user error (4XX), immediately respond with the status and message
        if (err.status && err.status >= 400 && err.status < 500) {
          res.status(err.status).send(err.message || "");
          return;
        }
        // For other errors, use the regular error handler so that the errors get reported, e.g. to
        // Sentry
        next(err);
        return;
      }
      next();
    });
  };
}
