module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    roots: [
        '<rootDir>/src',
        '<rootDir>/configs',
        '<rootDir>/middleware',
        '<rootDir>/models',
        '<rootDir>/utils',
    ], // Include 'configs' directory
    transform: {
        '^.+\\.ts$': 'ts-jest',
    },
    testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.ts$', // Make sure this regex does not exclude your test files
    moduleFileExtensions: ['ts', 'js', 'json', 'node'],
};
