/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  moduleNameMapper: {
    "react-leaflet": "<rootDir>/src/tests/mocks/reactLeaflet.mock.tsx",
    "../../services/apiService": "<rootDir>/src/services/apiService.ts",
  },
};
