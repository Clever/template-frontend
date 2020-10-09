/**
 * Initial data that the server provides to the client on page load.
 *
 * Populated on the server in src/server/lib/initialData.ts.
 * Accessible on the client via:
 *   import { initialData } from "src/ui/lib/initialData";
 *
 * Take care not to add any secrets to this.
 */
export interface InitialData {
  // Sample fields
  // isProduction: boolean;
  // oauthURL: string;
  // pendoAPIKey: string;
  // userID: string;
}
