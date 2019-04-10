import { HttpMethod, patchExpressForPromises } from "clever-frontend-utils";
import * as bodyParser from "body-parser";
import * as cookieParser from "cookie-parser";
import * as express from "express";
import * as path from "path";

import { Clients } from "src/server/modules";
import { errorHandler } from "./errors/errorHandler";
import { installApiEndpoints } from "src/server/api";
import { installAuthEndpoints } from "src/server/auth";
import { LandingPageEndpoint } from "src/server/pages";

export function createApp() {
  const app = express();
  patchExpressForPromises(app);

  app.use(cookieParser());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.use(express.static(path.join(__dirname, "..", "..", "..", "__build")));

  // Etags aren't properly handled by all browsers so we outright disable all caching on
  // our API methods.
  app.use((req, res, next) => {
    res.header("Cache-Control", "no-cache");
    next();
  });

  app.set("views", `${__dirname}/src/server/pages/views`);

  app.get("/_healthcheck", (req, res) => {
    res.sendStatus(200);
  });

  Clients.initialize();

  installAuthEndpoints(app);
  installApiEndpoints(app);

  // Catch-all route to serve the UI, if no auth or API endpoints above match
  (new LandingPageEndpoint()).install(app, HttpMethod.GET, "*");

  app.use(errorHandler);

  return app;
}
