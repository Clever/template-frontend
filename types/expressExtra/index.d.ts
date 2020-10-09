// Extend the Express request type definition to include fields added by us

import express = require("express");

declare global {
  namespace Express {
    interface Request {
      endpointType: string;
    }
  }
}
