import { addCartItem } from '@/controllers/CartController';

describe('CartController.test.ts Controller', () => {
    it('should handle requests correctly', () => {
        const req = {
                body: {},
                params: {},
                query: {},
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
                send: jest.fn(),
                json: jest.fn(),
                sendStatus: jest.fn(),
                links: jest.fn(),
                jsonp: jest.fn(),
                type: jest.fn(),
                format: jest.fn(),
                attachment: jest.fn(),
                set: jest.fn(),
                get: jest.fn(),
                clearCookie: jest.fn(),
                cookie: jest.fn(),
                location: jest.fn(),
                redirect: jest.fn(),
                render: jest.fn(),
                vary: jest.fn(),
                append: jest.fn(),
            } as any;
        addCartItem(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
    });
});
