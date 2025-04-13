import mongoose from 'mongoose';
import { dbConnection } from './db'; // Adjust the path to your actual file
import config from './config'; // Make sure config is properly imported

jest.mock('mongoose', () => ({
    connect: jest.fn(),
}));

describe('Database Connection', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should connect to the database successfully', async () => {
        // Mock mongoose.connect to resolve successfully
        (mongoose.connect as jest.Mock).mockResolvedValueOnce('Connected');

        // Call the dbConnection function
        await dbConnection();

        // Check if mongoose.connect was called with the right URI
        expect(mongoose.connect).toHaveBeenCalledWith(config.databaseUri);
        expect(mongoose.connect).toHaveBeenCalledTimes(1);

        // Since console.log is called on successful connection,
        // we might want to mock and check console.log as well
        const logSpy = jest.spyOn(console, 'log');
        await dbConnection();
        expect(logSpy).toHaveBeenCalledWith('Connected to MongoDB');
        logSpy.mockRestore();
    });

    it('should handle connection errors', async () => {
        const consoleSpy = jest.spyOn(console, 'error');

        // Mock mongoose.connect to throw an error
        const errorMessage = 'Error connecting to MongoDB';
        (mongoose.connect as jest.Mock).mockRejectedValueOnce(
            new Error(errorMessage)
        );

        // Call the dbConnection function
        await dbConnection();

        // Check if console.error was called correctly
        expect(console.error).toHaveBeenCalledWith(
            'Error connecting to MongoDB',
            expect.any(Error)
        );
        expect(console.error).toHaveBeenCalledTimes(1);

        consoleSpy.mockRestore();
    });
});
