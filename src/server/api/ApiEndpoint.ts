import { Endpoint } from "clever-frontend-utils";

import { endpointTypeMiddleware, userLoggedInMiddleware } from "src/server/middleware";

export class ApiEndpoint extends Endpoint {
  constructor() {
    super();
    this.addMiddleware(endpointTypeMiddleware("api"));
    this.addMiddleware(userLoggedInMiddleware());
  }
}
