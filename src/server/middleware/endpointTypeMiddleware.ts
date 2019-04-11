export enum EndpointType {
  API = "api",
  AUTH = "auth",
  PAGE_SERVING = "pageServing",
}

export const endpointTypeMiddleware = (endpointType: EndpointType) => (req, res, next) => {
  req.endpointType = endpointType;
  next();
};
