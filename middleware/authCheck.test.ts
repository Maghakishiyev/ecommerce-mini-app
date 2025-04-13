import { Response } from 'express';
import { authCheck, ReqWithUser } from '@/middleware/authCheck';
import jwt from 'jsonwebtoken';

// Mock the jwt and config modules
jest.mock('jsonwebtoken', () => ({
    verify: jest.fn(),
}));
jest.mock('../configs', () => ({
    jwt_secret: 'fake_secret',
}));

describe('authCheck Middleware', () => {
    let mockReq: Partial<ReqWithUser>;
    let mockRes: Partial<Response>;
    let mockNext: jest.Mock;

    beforeEach(() => {
        mockReq = {
            headers: {
                authorization: 'Bearer fake.token.here',
            },
        };

        // Mock response object with necessary methods
        mockRes = {
            sendStatus: jest.fn().mockReturnThis(), // Ensure it can be chained if necessary
            json: jest.fn().mockReturnThis(), // Mock other methods as needed
        };
        mockNext = jest.fn();
    });

    it('should send 401 if no token is provided', () => {
        mockReq.headers = {};

        authCheck(mockReq as ReqWithUser, mockRes as Response, mockNext);

        expect(mockRes.sendStatus).toHaveBeenCalledWith(401);
    });

    it('should send 403 if token is invalid', () => {
        (jwt.verify as jest.Mock).mockImplementationOnce(
            (token, secret, callback) => {
                callback(new Error('Invalid token'), undefined);
            }
        );

        authCheck(mockReq as ReqWithUser, mockRes as Response, mockNext);

        expect(mockRes.sendStatus).toHaveBeenCalledWith(403);
    });

    it('should call next if token is valid', () => {
        const user = { userId: '123', iat: 0, exp: 100 };
        (jwt.verify as jest.Mock).mockImplementationOnce(
            (token, secret, callback) => {
                callback(null, user);
            }
        );

        authCheck(mockReq as ReqWithUser, mockRes as Response, mockNext);

        expect(mockReq.user).toEqual(user);
        expect(mockNext).toHaveBeenCalled();
    });

    it('should send 403 if decoded object does not contain userId', () => {
        const user = { iat: 0, exp: 100 }; // Missing userId
        (jwt.verify as jest.Mock).mockImplementationOnce(
            (token, secret, callback) => {
                callback(null, user);
            }
        );

        authCheck(mockReq as ReqWithUser, mockRes as Response, mockNext);

        expect(mockRes.sendStatus).toHaveBeenCalledWith(403);
    });
});
