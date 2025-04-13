import { createOrder } from '@/controllers/OrdersController';

describe('OrdersController.test.ts Controller', () => {
    it('should handle requests correctly', () => {
        const req = {} as any,
            res = {
                status: jest.fn().mockReturnThis(),
                send: jest.fn(),
            } as any;
        createOrder(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
    });
});
