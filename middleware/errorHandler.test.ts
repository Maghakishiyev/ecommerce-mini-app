import errorHandler from './errorHandler';
import { Request, Response, NextFunction } from 'express';

// Mock environment variable
const originalEnv = process.env;

describe('Error Handler Middleware', () => {
    let mockReq: Partial<Request>;
    let mockRes: Partial<Response>;
    let mockNext: jest.Mock<NextFunction>;
    let mockError: any;

    beforeEach(() => {
        mockReq = {}; // Mock request object
        mockRes = {
            // Mock response object with status and json methods
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis(),
        };
        mockNext = jest.fn(); // Mock next function
    });

    afterEach(() => {
        process.env = originalEnv; // Restore original environment variable
    });

    it('should handle errors with status code 500 by default', () => {
        mockError = new Error('Internal server error');
        errorHandler(
            mockError,
            mockReq as Request,
            mockRes as Response,
            mockNext
        );

        expect(mockRes.status).toHaveBeenCalledWith(500);
        expect(mockRes.json).toHaveBeenCalledWith({
            message: 'Internal server error',
            stack: expect.any(String), // Check for the presence of a stack trace
        });
    });

    it('should return the custom status code and message from the error object', () => {
        mockError = { statusCode: 404, message: 'Not found' };
        errorHandler(
            mockError,
            mockReq as Request,
            mockRes as Response,
            mockNext
        );

        expect(mockRes.status).toHaveBeenCalledWith(404);
        expect(mockRes.json).toHaveBeenCalledWith({
            message: 'Not found',
            stack: undefined,
        });
    });

    it('should hide stack trace in production environment', () => {
        process.env.NODE_ENV = 'production';
        mockError = new Error('Sensitive error information');

        errorHandler(
            mockError,
            mockReq as Request,
            mockRes as Response,
            mockNext
        );

        expect(mockRes.json).toHaveBeenCalledWith({
            message: 'Sensitive error information',
            stack: '🥞',
        });
    });

    it('should show stack trace in non-production environment', () => {
        process.env.NODE_ENV = 'development';
        mockError = new Error('Detailed error information');

        errorHandler(
            mockError,
            mockReq as Request,
            mockRes as Response,
            mockNext
        );

        expect(mockRes.json).toHaveBeenCalledWith({
            message: 'Detailed error information',
            stack: expect.any(String),
        });
    });
});
