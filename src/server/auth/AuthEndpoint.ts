import { Endpoint } from "clever-frontend-utils";

import { endpointTypeMiddleware } from "src/server/middleware";

export class AuthEndpoint extends Endpoint {
  constructor() {
    super();
    this.addMiddleware(endpointTypeMiddleware("auth"));
  }
}
