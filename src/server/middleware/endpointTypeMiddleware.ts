import * as express from "express";

export enum EndpointType {
  API = "api",
  AUTH = "auth",
  PAGE_SERVING = "pageServing",
}

export const endpointTypeMiddleware = (endpointType: EndpointType) => (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  req.endpointType = endpointType;
  next();
};
