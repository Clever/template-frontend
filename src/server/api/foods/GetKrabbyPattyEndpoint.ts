import { ApiEndpoint } from "../ApiEndpoint";
import { KrabbyPatty } from "src/shared/models";

export class GetKrabbyPattyEndpoint extends ApiEndpoint {
  async handler(req, res) {
    res.json({ krabbyPatty: new KrabbyPatty({}) });
  }
}
