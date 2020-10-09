import { Endpoint } from "clever-frontend-utils";
import * as express from "express";

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
    // TODO: Set up the initial-data pattern for pre-fetching data on page load
    // this.addMiddleware(initialDataMiddleware());
  }

  async handler(req: express.Request, res: express.Response) {
    // TODO: Replace this static file with a template that can have server-injected content
    res.render("index");
  }
}
