describe('Config Module', () => {
    // Store original environment variables to restore after tests
    const originalEnv = process.env;

    // Reset environment variables to a known state before each test
    beforeEach(() => {
        jest.resetModules(); // This is necessary to reset the state of imported modules
        process.env = { ...originalEnv }; // Make a copy of the original environment
    });

    // Restore original environment variables after all tests
    afterAll(() => {
        process.env = originalEnv;
    });

    it('should use environment variables when available', () => {
        process.env.MONGO_URI = 'test_database_uri';
        process.env.JWT_SECRET = 'test_jwt_secret';

        // Need to re-import config to reflect updated environment variables
        const dynamicConfig = require('./config').default;

        expect(dynamicConfig.databaseUri).toEqual('test_database_uri');
        expect(dynamicConfig.jwtSecret).toEqual('test_jwt_secret');
    });

    it('should fall back to default values when environment variables are not set', () => {
        // Ensure environment variables are not set
        delete process.env.MONGO_URI;
        delete process.env.JWT_SECRET;

        // Re-import config to reflect the absence of environment variables
        const dynamicConfig = require('./config').default;

        expect(dynamicConfig.databaseUri).toEqual('default_database_uri');
        expect(dynamicConfig.jwtSecret).toEqual('default_jwt_secret');
    });
});
