import * as express from "express";

import { AuthorizationError } from "src/server/app/errors";

export const userLoggedInMiddleware = () => (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  // Check that a user is logged in
  const userLoggedIn = true;
  if (!userLoggedIn) {
    throw new AuthorizationError("User not logged in");
  }

  next();
};
