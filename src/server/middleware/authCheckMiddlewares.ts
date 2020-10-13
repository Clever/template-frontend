import * as express from "express";

import { AuthenticationError } from "src/server/app/errors";
import { authCheck } from "src/server/auth/authCheck";
import { authRedirect } from "src/server/auth/authRedirect";

export const pageServingAuthCheckMiddleware = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  try {
    await authCheck(req);
  } catch (err) {
    if (err instanceof AuthenticationError) {
      authRedirect(req, res);
      return;
    }
    throw err;
  }
  next();
};

export const apiAuthCheckMiddleware = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  await authCheck(req);
  next();
};
