import { isAdmin } from '@/middleware/adminMiddleware';

describe('adminMiddleware Middleware', () => {
    it('should call next function', () => {
        const req = {
                headers: {},
                user: { role: 'admin' },
            } as any,
            res = {
                status: jest.fn().mockReturnThis(),
                send: jest.fn(),
            } as any,
            next = jest.fn();
        isAdmin(req, res, next);
        expect(next).toHaveBeenCalled();
    });
});
