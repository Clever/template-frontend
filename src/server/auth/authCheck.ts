import * as express from "express";

import { AuthenticationError } from "src/server/app/errors";

// TODO: Check if the user is logged in. If not, throw an AuthenticationError.
export async function authCheck(req: express.Request) {
  const authenticated = true;
  if (!authenticated) {
    throw new AuthenticationError("User not logged in");
  }
}
