import { Endpoint } from "clever-frontend-utils";
import * as express from "express";

import * as config from "src/server/config";
import { constructInitialData } from "src/server/lib/initialData";
import { endpointTypeMiddleware, pageServingAuthCheckMiddleware } from "src/server/middleware";

// For most repos, you should only need this one page-serving endpoint. Only if you need to serve
// separate single-page apps, e.g. for different user types, should you need more than one.
export class PageServingEndpoint extends Endpoint {
  constructor() {
    super();
    this.addMiddleware(endpointTypeMiddleware("pageServing"));
    this.addMiddleware(pageServingAuthCheckMiddleware);
  }

  async handler(req: express.Request, res: express.Response) {
    res.locals.faviconPath = config.FAVICON_PATH;
    res.locals.initialData = await constructInitialData(req, res);
    res.render("app");
  }
}
