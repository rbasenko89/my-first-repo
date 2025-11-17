import type { Config } from 'jest';

const config: Config = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    setupFiles: ['dotenv/config'],
    testMatch: ['**/*.spec.ts'],
    maxWorkers: 1,
    testTimeout: 15000
};

export default config;
