import { createProduct } from '../controllers/productController';

describe('productController.test.ts Controller', () => {
    it('should handle requests correctly', () => {
        const req = {} as any,
            res = {
                status: jest.fn().mockReturnThis(),
                send: jest.fn(),
            } as any;
        createProduct(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
    });
});
