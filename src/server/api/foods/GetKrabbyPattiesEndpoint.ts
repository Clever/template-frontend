import * as express from "express";

import { ApiEndpoint } from "../ApiEndpoint";

export class GetKrabbyPattiesEndpoint extends ApiEndpoint {
  async handler(req: express.Request, res: express.Response) {
    res.json({ krabbyPatties: [] });
  }
}
