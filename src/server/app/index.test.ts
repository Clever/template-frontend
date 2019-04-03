import * as assert from "assert";
import { MainRoutes } from "../../../api/mainRoutes";

describe("server", () => {
  // TODO: remove this test once the associated endpoint is removed
  describe("/api/fetch_clever_website", () => {
    it("returns the Clever website", () => {
      const mockBody = "hello world!";
      const mockReq = {};

      // you can just replace globals with mocks directly since each
      // test is sandboxed
      (global as any).fetch = jest.fn().mockImplementation(async () => (
        { text: async () => mockBody }
      ));
      const mockRes = {
        json: (statusCode, data) => {
          assert.equal(statusCode, 200);
          assert.equal(data, mockBody);
        },
      };

      return new MainRoutes().fetchCleverWebsite(mockReq, mockRes);
    });
  });

  // TODO: test future API routes here, or in other test files.
});
