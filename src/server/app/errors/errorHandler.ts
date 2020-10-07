import * as path from "path";

import { AuthorizationError, NotFoundError, PermissionError, ValidationError } from "./errors";
import { EndpointType } from "src/server/middleware";

function serveErrorPage(res, statusCode, message) {
  res.status(statusCode);
  res.locals.message = message;

  // TODO: Replace this static file with a template that can have server-injected content
  // res.render("error.pug");
  res.sendFile(path.resolve(__dirname, "..", "..", "pages", "views", "error.html"));
}

// Express identifies error-handling middleware by number of params (four instead of the typical
// three)
export const errorHandler = (err, req, res, next) => {
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
    // This block handles both `InternalError`s and basic `Error`s. For both of these errors, we
    // intentionally don't send error details to the client.
    if (endpointServesJson) {
      res.sendStatus(500);
    } else {
      serveErrorPage(res, 500, "");
    }
    // TODO: Log this error to an error reporting service
  }
};
