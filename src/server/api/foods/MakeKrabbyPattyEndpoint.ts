import * as express from "express";

import { ApiEndpoint } from "../ApiEndpoint";
import { Clients } from "src/server/lib";

export class MakeKrabbyPattyEndpoint extends ApiEndpoint {
  async handler(req: express.Request, res: express.Response) {
    const options = req.body;

    // No need to wrap this in a try catch. Let errors bubble up to the global error handler
    const krabbyPatty = await Clients.krabbyPattyLib.makeKrabbyPatty(options);

    res.json({ krabbyPatty });
  }
}
