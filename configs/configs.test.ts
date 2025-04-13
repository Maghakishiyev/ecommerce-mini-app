import config from '.';

describe('Config Tests', () => {
    // Backup the current environment variables
    const originalEnv = process.env;

    beforeEach(() => {
        // Clear the environment variables before each test
        jest.resetModules();
        process.env = { ...originalEnv };
    });

    afterAll(() => {
        // Restore the original environment variables after all tests
        process.env = originalEnv;
    });

    it('should use default values when environment variables are not set', () => {
        process.env.JWT_SECRET = '';

        expect(config.port).toBe('undefined');
        expect(config.jwt_secret).toBe('-|your@_@default@_@secret|-');
        expect(config.mongo_uri).toBe('undefined');
    });

    it('should correctly set config from environment variables', () => {
        process.env.PORT = '3000';
        process.env.JWT_SECRET = 'secret123';
        process.env.MONGO_URI = 'mongodb://localhost:27017/test';

        const config = require('.').default;

        expect(config.port).toBe('3000');
        expect(config.jwt_secret).toBe('secret123');
        expect(config.mongo_uri).toBe('mongodb://localhost:27017/test');
    });
});
