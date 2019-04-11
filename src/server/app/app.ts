import { HttpMethod, patchExpressForPromises } from "clever-frontend-utils";
import * as bodyParser from "body-parser";
import * as compression from "compression";
import * as cookieParser from "cookie-parser";
import * as express from "express";
import * as path from "path";

import { Clients } from "src/server/lib";
import { errorHandler } from "./errors/errorHandler";
import { installApiEndpoints } from "src/server/api";
import { installAuthEndpoints } from "src/server/auth";
import { LandingPageEndpoint } from "src/server/pages";
import { PORT } from "../../../config";

export function startServer() {
  const app = express();
  patchExpressForPromises(app);

  app.use(cookieParser());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(compression());
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

  // Start the server
  app.listen(PORT, () => {
    // tslint:disable-next-line:no-console
    console.log(`Listening on port ${PORT}...`);
  });
}
