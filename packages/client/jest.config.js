module.exports = {
  collectCoverage: true,
  coverageDirectory: 'coverage/',
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: -10
    }
  },
  testPathIgnorePatterns: [
    "node_modules",
    "dist",
    "__tests__/helpers"
  ],
  verbose: true,
}