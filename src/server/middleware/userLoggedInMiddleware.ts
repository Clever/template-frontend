import { AuthorizationError } from "src/server/app/errors";

export const userLoggedInMiddleware = () => (req, res, next) => {
  // Check that a user is logged in
  const userLoggedIn = true;
  if (!userLoggedIn) {
    throw new AuthorizationError("User not logged in");
  }

  next();
};
