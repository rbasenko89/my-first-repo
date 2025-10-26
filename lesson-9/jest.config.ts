import type { Config } from 'jest';

const config: Config = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    roots: ['<rootDir>/tests/jest'],
    transform: { '^.+\\.tsx?$': 'ts-jest' },
    moduleFileExtensions: ['ts', 'js', 'json'],
    verbose: true
};
export default config;
