import { Endpoint } from "clever-frontend-utils";
import * as express from "express";

import { constructInitialData } from "src/server/lib/initialData";
import {
  EndpointType,
  endpointTypeMiddleware,
  userLoggedInMiddleware,
} from "src/server/middleware";

// For most repos, you should only need this one landing-page endpoint. Only if you need to serve
// separate single-page apps for different user types, for example, should you need more than one
export class LandingPageEndpoint extends Endpoint {
  constructor() {
    super();
    this.addMiddleware(endpointTypeMiddleware(EndpointType.PAGE_SERVING));
    this.addMiddleware(userLoggedInMiddleware());
  }

  async handler(req: express.Request, res: express.Response) {
    res.locals.initialData = await constructInitialData(req, res);
    res.render("index");
  }
}
