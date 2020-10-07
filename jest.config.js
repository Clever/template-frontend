module.exports = {
  moduleNameMapper: {
    ".*\.(css|less|png|svg)$": "<rootDir>/jest/staticImportStub.js",
  },
  setupFiles: [
    "<rootDir>/jest/setup.js",
  ],
  testRegex: ".+\.test\.(ts|tsx)$",
  transform: {
    ".+\.(ts|tsx)$": "ts-jest",
  },
};
