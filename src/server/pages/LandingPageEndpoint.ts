import { Endpoint } from "clever-frontend-utils";
import * as path from "path";

import {
  EndpointType,
  endpointTypeMiddleware,
  userLoggedInMiddleware,
} from "src/server/middleware";

export class LandingPageEndpoint extends Endpoint {
  constructor() {
    super();
    this.addMiddleware(endpointTypeMiddleware(EndpointType.PAGE_SERVING));
    this.addMiddleware(userLoggedInMiddleware());
    // TODO: Set up the initial-data pattern for pre-fetching data on page load
    // this.addMiddleware(initialDataMiddleware());
  }

  async handler(req, res) {
    // TODO: Replace this static file with a template that can have server-injected content
    // res.render("index.pug");
    res.sendFile(path.resolve(__dirname, "views", "index.html"));
  }
}
