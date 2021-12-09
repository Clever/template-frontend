import * as express from "express";

// TODO: Kick off a login
export function authRedirect(req: express.Request, res: express.Response) {
  // even though the server runs at 5021 will need to
  // redirect to 5020 (webpack dev server port) in local development
  res.redirect("/");
}
