import { Endpoint } from "clever-frontend-utils";
import * as express from "express";

import { constructInitialData } from "src/server/lib/initialData";
import {
  EndpointType,
  endpointTypeMiddleware,
  userLoggedInMiddleware,
} from "src/server/middleware";

// For most repos, you should only need this one page-serving endpoint. Only if you need to serve
// separate single-page apps, e.g. for different user types, should you need more than one.
export class PageServingEndpoint extends Endpoint {
  constructor() {
    super();
    this.addMiddleware(endpointTypeMiddleware(EndpointType.PAGE_SERVING));
    this.addMiddleware(userLoggedInMiddleware());
  }

  async handler(req: express.Request, res: express.Response) {
    res.locals.initialData = await constructInitialData(req, res);
    res.render("app");
  }
}
