import * as express from "express";

import { ApiEndpoint } from "../ApiEndpoint";
import { KrabbyPatty } from "src/shared/models";

export class GetKrabbyPattyEndpoint extends ApiEndpoint {
  async handler(req: express.Request, res: express.Response) {
    res.json({ krabbyPatty: new KrabbyPatty({}) });
  }
}
