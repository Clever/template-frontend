import * as express from "express";
import { HttpMethod } from "clever-frontend-utils";

import { GetCharacterEndpoint } from "./characters/GetCharacterEndpoint";

import { GetKrabbyPattiesEndpoint } from "./foods/GetKrabbyPattiesEndpoint";
import { GetKrabbyPattyEndpoint } from "./foods/GetKrabbyPattyEndpoint";
import { MakeKrabbyPattyEndpoint } from "./foods/MakeKrabbyPattyEndpoint";

export function installApiEndpoints(app: express.Application) {
  new GetCharacterEndpoint().install(app, HttpMethod.GET, "/api/characters/:characterID");

  new GetKrabbyPattiesEndpoint().install(app, HttpMethod.GET, "/api/foods/krabbyPatties");
  new GetKrabbyPattyEndpoint().install(
    app,
    HttpMethod.GET,
    "/api/foods/krabbyPatties/:krabbyPattyID",
  );
  new MakeKrabbyPattyEndpoint().install(app, HttpMethod.POST, "/api/foods/krabbyPatties");
}
