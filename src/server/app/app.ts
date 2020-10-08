import { HttpMethod, patchExpressForPromises } from "clever-frontend-utils";
import * as bodyParser from "body-parser";
import * as compression from "compression";
import * as cookieParser from "cookie-parser";
import * as express from "express";
import * as path from "path";
import * as kayvee from "kayvee";

import { Clients } from "src/server/lib";
import { errorHandler } from "./errors/errorHandler";
import { installApiEndpoints } from "src/server/api";
import { installAuthEndpoints } from "src/server/auth";
import { LandingPageEndpoint } from "src/server/pages";
import { PORT } from "../config";
import { csrfProtectionMiddleware } from "../middleware";

export function startServer() {
  // env vars are guaranteed by our deployment system
  const isLocal = process.env._IS_LOCAL === "true";
  const logger = new kayvee.logger(process.env._APP_NAME);
  kayvee.setGlobalRouting(path.join(__dirname, "..", "..", "..", "kvconfig.yml"));

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

  // Run CSRF middleware before routing for other endpoints
  app.use(csrfProtectionMiddleware);

  installAuthEndpoints(app);
  installApiEndpoints(app);

  // Catch-all route to serve the UI, if no auth or API endpoints above match
  new LandingPageEndpoint().install(app, HttpMethod.GET, "*");

  app.use(errorHandler);

  // Start the server
  const server = app.listen(Number(PORT), isLocal ? "localhost" : "0.0.0.0", () => {
    console.log(`Listening on port ${PORT}...`);

    // Our SIGTERM handler breaks server code watch functionality, so let's skip setting it up
    // when running locally
    if (isLocal) {
      return;
    }

    process.on("SIGTERM", () => {
      logger.info("sigterm-received");
      server.close(() => {
        logger.info("exiting");
        process.exit(0);
      });
    });
  });
}
