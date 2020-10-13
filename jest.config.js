module.exports = {
  moduleNameMapper: {
    ".*\.(css|less|png|svg)$": "<rootDir>/jest/staticImportStub.js",
    "^src/(.*)": "<rootDir>/src/$1",
  },
  setupFilesAfterEnv: [
    "<rootDir>/jest/setup.ts",
  ],
  testRegex: ".+\.test\.(ts|tsx)$",
  transform: {
    ".+\.(ts|tsx)$": "ts-jest",
  },
};
