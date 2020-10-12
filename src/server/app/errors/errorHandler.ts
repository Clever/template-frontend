import * as express from "express";
import * as kayvee from "kayvee";

import { AuthorizationError, NotFoundError, PermissionError, ValidationError } from "./errors";
import * as config from "src/server/config";
import { EndpointType } from "src/server/middleware";
import { extractFieldsFromRequest } from "src/server/lib/logging";

// We disable the @clever/no-send-status-error in the ErrorHandler since this is where we translate
// the thrown errors to status codes.
/* eslint-disable @clever/no-send-status-error */

function serveErrorPage(res: express.Response, statusCode: number, message: string) {
  res.status(statusCode);
  res.locals.message = message;
  res.render("error");
}

// Use a one-off logger rather than req.log since we may encounter errors in code that runs before
// the middleware that populates req.log
const logger = new kayvee.Logger(config.APP_NAME);

// Express identifies error-handling middleware by number of params (four instead of the typical
// three)
export const errorHandler = (
  err: Error,
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  const endpointServesJson = req.endpointType === EndpointType.API;

  if (err instanceof AuthorizationError) {
    if (endpointServesJson) {
      res.status(401).json({ error: err.message, code: err.code });
    } else {
      serveErrorPage(res, 401, err.message);
    }
  } else if (err instanceof PermissionError) {
    if (endpointServesJson) {
      res.status(403).json({ error: err.message, code: err.code });
    } else {
      serveErrorPage(res, 403, err.message);
    }
  } else if (err instanceof NotFoundError) {
    if (endpointServesJson) {
      res.status(404).json({ error: err.message, code: err.code });
    } else {
      serveErrorPage(res, 404, err.message);
    }
  } else if (err instanceof ValidationError) {
    if (endpointServesJson) {
      res.status(422).json({ error: err.message, code: err.code });
    } else {
      serveErrorPage(res, 422, err.message);
    }
  } else {
    // For 5xxs, we intentionally don't send error details to the client
    if (endpointServesJson) {
      res.sendStatus(500);
    } else {
      serveErrorPage(res, 500, "");
    }
    logger.errorD("unknown-error", {
      ...extractFieldsFromRequest(req),
      message: err.message,
    });
    // TODO: Log this error to an error reporting service, e.g. Sentry
  }
};
