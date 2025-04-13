
import request from 'supertest';
import app from '../src/index'; // Assuming the app is exported from src/index

describe('Orders API', () => {
    it('should create a new order', async () => {
        const response = await request(app)
            .post('/api/orders')
            .send({
                user: '60f6c0a1b34c1c001c8e4d3f',
                items: [{ product: '60f6c0a1b34c1c001c8e4d40', quantity: 2, price: 100 }],
                total: 200,
                deliveryStatus: 'pending',
                shipmentMethod: '60f6c0a1b34c1c001c8e4d42',
            });
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('_id');
    });

    it('should fetch an order by ID', async () => {
        const response = await request(app).get('/api/orders/60f6c0a1b34c1c001c8e4d3f');
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('_id');
    });
});
    