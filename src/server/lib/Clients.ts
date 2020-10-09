// A fake WAG client. Included to demonstrate what it looks like to load a WAG client onto this
// class.
// import * as SpongeBobService from "@clever/spongebob-service";

import { KrabbyPattyLib } from "./krabbyPatties/KrabbyPattyLib";
import * as config from "src/server/config";

// A mock for the fake WAG client
class SpongeBobService {
  constructor(options: DiscoveryOptions) {
    return;
  }
}

interface DiscoveryOptions {
  discovery: true;
}

function constructWagClientOptions(): DiscoveryOptions {
  return { discovery: true };
}

class ClientDefinitions {
  static krabbyPattyLib: KrabbyPattyLib;
  static spongeBobService: SpongeBobService;
}

/**
 * The Clients class is intended to simplify the process of passing dependencies (backend clients
 * and frontend server libs) around the server codebase.
 *
 * Rather than passing all needed clients and libs to each endpoint handler and module as
 * constructor params, we can load everything onto the Clients class. Endpoint handlers and libs
 * can then import this one class for access to all needed dependencies.
 */
export class Clients extends ClientDefinitions {
  static initialize(overrides: PartialClientsMap = {}) {
    if (config.IS_TEST) {
      Object.assign(this, overrides);
      return;
    }

    this.krabbyPattyLib = new KrabbyPattyLib();
    this.spongeBobService = new SpongeBobService(constructWagClientOptions());
    Object.assign(this, overrides);
  }
}

// The Omit is necessary since typeof ClientDefinitions includes a prototype field we want to
// exclude.
type ClientsMap = Omit<typeof ClientDefinitions, "prototype">;

/**
 * An object where all clients can optionally be present and all methods of a client are optional.
 * Ideal for passing in mocks of clients.
 */
type PartialClientsMap = Partial<
  { [clientKey in keyof ClientsMap]: Partial<ClientsMap[clientKey]> }
>;
