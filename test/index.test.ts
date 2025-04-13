import { authCheck } from '@/middleware/index';

describe('index Middleware', () => {
    it('should call next function', () => {
        const req = {
                headers: {},
                get: jest.fn(),
                header: jest.fn(),
                accepts: jest.fn(),
                acceptsCharsets: jest.fn(),
                acceptsEncodings: jest.fn(),
                acceptsLanguages: jest.fn(),
                range: jest.fn(),
                param: jest.fn(),
                is: jest.fn(),
                protocol: 'http',
                secure: false,
                ip: '127.0.0.1',
                ips: [],
                subdomains: [],
                path: '',
                hostname: '',
                host: '',
                fresh: false,
                stale: false,
                xhr: false,
                socket: {
                    remoteAddress: '127.0.0.1',
                },
            } as any,
            res = {
                status: jest.fn().mockReturnThis(),
                sendStatus: jest.fn().mockReturnThis(),
                json: jest.fn().mockReturnThis(),
                send: jest.fn().mockReturnThis(),
                end: jest.fn().mockReturnThis(),
            } as any,
            next = jest.fn();
        authCheck(req, res, next);
        expect(next).toHaveBeenCalled();
    });
});
