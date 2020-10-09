import * as express from "express";

import { InitialData } from "src/shared/models";

// See src/shared/models/InitialData.ts for more context
export async function constructInitialData(
  req: express.Request,
  res: express.Response,
): Promise<InitialData> {
  return {
    // Populate initial data here
  };
}
