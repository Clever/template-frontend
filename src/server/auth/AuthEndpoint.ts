import { Endpoint } from "clever-frontend-utils";

import { EndpointType, endpointTypeMiddleware } from "src/server/middleware";

export class AuthEndpoint extends Endpoint {
  constructor() {
    super();
    this.addMiddleware(endpointTypeMiddleware(EndpointType.AUTH));
  }
}
