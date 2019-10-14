// check article: Jest configuration
// https://jestjs.io/docs/en/configuration
module.exports = {
    preset: "jest-preset-angular",
    roots: ["src"],
    setupFilesAfterEnv: ["./src/setup-jest.ts"]
};
