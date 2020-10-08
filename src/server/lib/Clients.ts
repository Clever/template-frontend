/**
 * The Clients class is intended to simplify the process of passing dependencies (backend clients
 * and frontend server libs) around the server codebase.
 *
 * Rather than passing all needed clients and libs to each endpoint handler and module as
 * constructor params, we can load everything onto the Clients class. Endpoint handlers and libs
 * can then import this one class for access to all needed dependencies.
 */

// A fake WAG client. Included to demonstrate what it looks like to load a WAG client onto this
// class.
// import * as SpongeBobService from "@clever/spongebob-service";

import { KrabbyPattyLib } from "./krabbyPatties/KrabbyPattyLib";

interface ClientMap {
  krabbyPattyLib?: any;
  spongeBobService?: any;
}

export class Clients {
  static _krabbyPattyLib: KrabbyPattyLib;
  static _spongeBobService: any;

  static constructWagClientOptions() {
    return {};
  }

  static initialize() {
    const krabbyPattyLib = new KrabbyPattyLib();

    // const spongeBobService = new SpongeBobService(this.constructWagClientOptions());

    this.loadClients({
      krabbyPattyLib,
      // spongeBobService,
    });
  }

  static loadClients(clients: ClientMap) {
    this._krabbyPattyLib = clients.krabbyPattyLib;
    this._spongeBobService = clients.spongeBobService;
  }

  static get krabbyPattyLib(): KrabbyPattyLib {
    return this._krabbyPattyLib;
  }

  static get spongeBobService() {
    return this._spongeBobService;
  }
}
