/** @type {import('jest').Config} */
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    roots: ['<rootDir>/tests/jest'],
    transform: { '^.+\\.tsx?$': 'ts-jest' },
    moduleFileExtensions: ['ts', 'js', 'json'],
    verbose: true
};
