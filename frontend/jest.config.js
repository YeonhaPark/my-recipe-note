const { defaults } = require('jest-config');
module.exports = {
  roots: ['<rootDir>/src'],
  preset: 'ts-jest',
  testEnvironment: 'node',
  collectCoverage: true,
  coverageDirectory: 'coverage',
  collectCoverageFrom: [
    'src/components/atoms.{js,jsx,ts,tsx}',
    'src/components/molecules.{js,jsx,ts,tsx}',
    'src/components/organisms.{js,jsx,ts,tsx}',
    'src/components/pages.{js,jsx,ts,tsx}',
    'src/components/templates.{js,jsx,ts,tsx}',
    '!**/node_modules/**',
    '!src/api/**',
  ],
  testPathIgnorePatterns: ['/node_modules/'],
  coverageThreshold: {
    global: {
      branches: 40,
      functions: 60,
      lines: 60,
      statements: 60,
    },
  },
  verbose: true,
  moduleFileExtensions: [...defaults.moduleFileExtensions, 'ts', 'tsx'],
};
