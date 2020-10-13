import * as express from "express";

export type EndpointType = "api" | "auth" | "pageServing";

export const endpointTypeMiddleware = (endpointType: EndpointType) => (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  req.endpointType = endpointType;
  next();
};
