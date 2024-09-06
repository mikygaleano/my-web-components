export default  {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    testMatch: ['**/*.test.ts'],
    transform: {
      '^.+\\.ts?$': 'ts-jest'
    }
  };
  