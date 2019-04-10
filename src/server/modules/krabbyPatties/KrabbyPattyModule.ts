// import { Clients } from "../Clients";
import { ValidationError } from "src/server/app/errors";
import { KrabbyPatty, Sauce } from "src/shared/models";

interface KrabbyPattyOptions {
  sauces: Sauce[];
}

// Modules can build off of backend WAG clients and other modules
export class KrabbyPattyModule {
  async makeKrabbyPatty(options: KrabbyPattyOptions) {
    if (!options.sauces || !options.sauces.includes(Sauce.SECRET_FORMULA)) {
      throw new ValidationError("Can't forget the secret formula!", 1);
    }

    // spongebob-service doesn't actually exist so I'm mocking out a response from it
    // const response = await Clients.spongeBobService.makeKrabbyPatty(options);
    const response = {
      krabbyPatty: {
        cheese: true,
        id: "abc",
        numPickles: 3,
        sauces: options.sauces,

        // Though the API is returning `null` here, the `KrabbyPatty` data model will backfill the
        // field with an array
        seasonings: null,

        // This piece of data will get filtered out by the `KrabbyPatty` data model
        expectedResponseOnConsumption: "Yum",
      }
    };

    return new KrabbyPatty(response.krabbyPatty);
  }
}
