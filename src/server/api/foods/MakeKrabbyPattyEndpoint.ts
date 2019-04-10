import { ApiEndpoint } from "../ApiEndpoint";
import { Clients } from "src/server/modules";

export class MakeKrabbyPattyEndpoint extends ApiEndpoint {
  async handler(req, res) {
    const options = req.body;

    // No need to wrap this in a try catch. Let errors bubble up to the global error handler
    const krabbyPatty = await Clients.krabbyPattyModule.makeKrabbyPatty(options);

    res.json({ krabbyPatty });
  }
}
