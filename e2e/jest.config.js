/** @type {import('@jest/types').Config.InitialOptions} */
module.exports = {
  rootDir: '..',
  testMatch: ['<rootDir>/e2e/**/*.test.js'],
  testTimeout: 120000,
  maxWorkers: 1,
  globalSetup: 'detox/runners/jest/globalSetup',
  globalTeardown: 'detox/runners/jest/globalTeardown',
  reporters: [
    'detox/runners/jest/reporter',
    [
      'jest-stare',
      {
        resultDir: 'e2e/test-report',
        reportTitle: 'Detox Test Report',
        reportHeadline: 'React Native Detox Testing',
        coverageLink: '../coverage/lcov-report/index.html',
        disableGraphs: false,
      },
    ],
  ],
  testEnvironment: 'detox/runners/jest/testEnvironment',
  verbose: true,
  testSequencer: './e2e/mySequence.js'
};
