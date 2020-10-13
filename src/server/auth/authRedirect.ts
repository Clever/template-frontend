import * as express from "express";

// TODO: Kick off a login
export function authRedirect(req: express.Request, res: express.Response) {
  res.redirect("/");
}
