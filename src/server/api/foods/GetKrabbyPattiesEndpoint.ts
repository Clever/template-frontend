import { ApiEndpoint } from "../ApiEndpoint";

export class GetKrabbyPattiesEndpoint extends ApiEndpoint {
  async handler(req, res) {
    res.json({ krabbyPatties: [] });
  }
}
