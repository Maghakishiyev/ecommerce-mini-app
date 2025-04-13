
import request from 'supertest';
import app from '../src/index'; // Adjust path based on actual project structure

describe('validateCart.test.ts Routes', () => {
    it('should return a 200 status for the default route', async () => {
        const res = await request(app).get('/api/validateCart');
        expect(res.statusCode).toBe(200);
    });
});
