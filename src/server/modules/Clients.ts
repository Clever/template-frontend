/**
 * The Clients class is intended to simplify the process of passing dependencies (backend clients
 * and frontend server modules) around the server codebase.
 *
 * Rather than passing all needed clients and modules to each endpoint handler and module as
 * constructor params, we can load everything onto the Clients class. Endpoint handlers and modules
 * can then import this one class for access to all needed dependencies.
 */

// A fake WAG client. Included to demonstrate what it looks like to load a WAG client onto this
// class.
// import * as SpongeBobService from "@clever/spongebob-service";

import { KrabbyPattyModule } from "./krabbyPatties/KrabbyPattyModule";

interface ClientMap {
  krabbyPattyModule?: any;
  spongeBobService?: any;
}

export class Clients {
  static _krabbyPattyModule;
  static _spongeBobService;

  static constructWagClientOptions() {
    return {};
  }

  static initialize() {
    const krabbyPattyModule = new KrabbyPattyModule();

    // const spongeBobService = new SpongeBobService(this.constructWagClientOptions());

    this.loadClients({
      krabbyPattyModule,
      // spongeBobService,
    });
  }

  static loadClients(clients: ClientMap) {
    this._krabbyPattyModule = clients.krabbyPattyModule;
    this._spongeBobService = clients.spongeBobService;
  }

  static get spongeBobService() {
    return this._spongeBobService;
  }

  static get krabbyPattyModule(): KrabbyPattyModule {
    return this._krabbyPattyModule;
  }
}
