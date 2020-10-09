import * as express from "express";

import { PageServingEndpoint } from "./PageServingEndpoint";

export function installPageServingEndpoints(app: express.Application) {
  new PageServingEndpoint().install(app, "get", "*");
}
