import { Endpoint } from "clever-frontend-utils";

import { endpointTypeMiddleware } from "src/server/middleware";

// Create extensions of this class for auth functionality, e.g.
// class LogoutEndpoint extends AuthEndpoint {}
export class AuthEndpoint extends Endpoint {
  constructor() {
    super();
    this.addMiddleware(endpointTypeMiddleware("auth"));
  }
}
