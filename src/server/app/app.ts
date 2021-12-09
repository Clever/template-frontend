import * as bodyParser from "body-parser";
import * as compression from "compression";
import * as cookieParser from "cookie-parser";
import * as express from "express";
import * as helmet from "helmet";
import { patchExpressForPromises } from "clever-frontend-utils";
import * as path from "path";
import * as kayvee from "kayvee";

import { bodyParserErrorHandler } from "src/server/middleware/bodyParserErrorHandler";
import { Clients } from "src/server/lib";
import * as config from "src/server/config";
import { csrfProtectionMiddleware } from "src/server/middleware";
import { errorHandler } from "./errors/errorHandler";
import { extractFieldsFromRequest } from "src/server/lib/logging";
import { installApiEndpoints } from "src/server/api";
import { installAuthEndpoints } from "src/server/auth";
import { installPageServingEndpoints } from "src/server/pages";
import { NotFoundError } from "./errors";

export function startServer() {
  const logger = new kayvee.logger(config.APP_NAME);

  const app = express();
  patchExpressForPromises(app);

  app.set("trust proxy", true);
  app.set("view engine", "pug");
  const viewsDir = path.join(__dirname, "..", "..", "..", "src/server/pages/views");
  const builtViewsDir = path.join(__dirname, "..", "..", "..", "build/views");
  app.set("views", [viewsDir, builtViewsDir]);
  app.locals.basedir = viewsDir;

  app.use(bodyParserErrorHandler(bodyParser.json()));
  app.use(bodyParserErrorHandler(bodyParser.urlencoded({ extended: true })));
  app.use(compression());
  app.use(cookieParser());
  app.use(express.static(path.join(__dirname, "..", "..", "..", "build")));
  app.use(helmet());

  // Short-circuit if health check
  app.use(async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    if (req.url === "/_healthcheck") {
      res.sendStatus(200);
      return;
    }
    next();
  });

  // Auto-redirect from http to https (unless running locally)
  app.use(async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    if (req.secure || config.IS_LOCAL) {
      next();
      return;
    }
    res.redirect(`https://${req.hostname}${req.url}`);
  });

  // Return 404s rather than 500s for malformed paths
  app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
      decodeURIComponent(req.path);
    } catch (err) {
      throw new NotFoundError();
    }
    next();
  });

  // Etags aren't properly handled by all browsers so we outright disable all caching on
  // our API methods
  app.use((req, res, next) => {
    res.header("Cache-Control", "no-cache");
    next();
  });

  // Set up request-finished logs and `req.log` logger. Auto-populate as many fields as possible
  // from the request object
  const requestFinishedLoggerOptions = {
    handlers: [extractFieldsFromRequest],
    source: config.APP_NAME,
  };
  const contextLoggerOptions = {
    enabled: true,
    handlers: [extractFieldsFromRequest],
  };
  app.use(kayvee.middleware(requestFinishedLoggerOptions, contextLoggerOptions));

  // Set up log routing
  kayvee.setGlobalRouting(path.join(__dirname, "..", "..", "..", "kvconfig.yml"));

  Clients.initialize();

  // Run CSRF middleware before routing for other endpoints
  app.use(csrfProtectionMiddleware);

  installAuthEndpoints(app);
  installApiEndpoints(app);

  // Page-serving endpoints should be installed last as they include a catch-all route
  installPageServingEndpoints(app);

  app.use(errorHandler);

  // Start the server
  const server = app.listen(config.PORT, config.IS_LOCAL ? "localhost" : "0.0.0.0", () => {
    console.log(`Listening on port ${config.PORT}. Access local at localhost:5020...`);

    // Our SIGTERM handler breaks server code watch functionality, so let's skip setting it up
    // when running locally
    if (config.IS_LOCAL) {
      return;
    }

    process.on("SIGTERM", () => {
      logger.infoD("sigterm-received", {});
      server.close(() => {
        logger.infoD("exiting", {});
        process.exit(0);
      });
    });
  });
}
