import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
  roots: ["<rootDir>/src"],
  transform: {
    "^.+\\.tsx?$": "ts-jest",
    ".+\\.(css|scss|png|jpg|svg)$": "jest-transform-stub",
  },
  testEnvironment: "jsdom",
  testRegex: "(__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  coveragePathIgnorePatterns: [
    "<rootDir>/src/services/",
    "<rootDir>/src/utils/http.ts",
    "<rootDir>/src/utils/notification.ts",
  ],
};

export default config;
