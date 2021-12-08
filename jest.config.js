module.exports = {
  testEnvironment: "jsdom",
  modulePaths: ["<rootDir>"],
  transform: {
    ".+\\.(css|svg|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$":
      "jest-transform-stub",
    "^.+\\.(js|jsx)?$": "babel-jest",
    "^.+\\.tsx?$": "ts-jest",
  },
  // Module file extensions for importing
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
};
