import { Endpoint } from "clever-frontend-utils";

import {
  EndpointType,
  endpointTypeMiddleware,
  userLoggedInMiddleware,
} from "src/server/middleware";

export class ApiEndpoint extends Endpoint {
  constructor() {
    super();
    this.addMiddleware(endpointTypeMiddleware(EndpointType.API));
    this.addMiddleware(userLoggedInMiddleware());
  }
}
