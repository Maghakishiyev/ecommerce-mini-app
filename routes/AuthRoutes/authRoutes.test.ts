import request from 'supertest';
import express from 'express';
import bodyParser from 'body-parser';
import authRoutes from './index';
import { User } from '@/models/user/model';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

jest.mock('../../models/user/model');
const app = express();
app.use(bodyParser.json());
app.use('/accounts', authRoutes);

describe('POST /signin', () => {
    it('should authenticate user and return token', async () => {
        const mockUser = {
            _id: 'someUserId',
            email: 'test@example.com',
            password: '$2a$10$hash', // bcrypt hash of the password
            toObject: () => ({
                _id: 'someUserId',
                email: 'test@example.com',
            }),
        };
        User.findOne = jest.fn().mockResolvedValue(mockUser);
        bcryptjs.compare = jest.fn().mockResolvedValue(true);

        const response = await request(app)
            .post('/auth/signin')
            .send({ email: 'test@example.com', password: 'password' });

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('token');
        expect(bcryptjs.compare).toHaveBeenCalledWith(
            'password',
            mockUser.password
        );
    });

    it('should return 401 for invalid credentials', async () => {
        User.findOne = jest.fn().mockResolvedValue(null);

        const response = await request(app)
            .post('/auth/signin')
            .send({ email: 'test@example.com', password: 'password' });

        expect(response.status).toBe(401);
    });
});

describe('POST /signup', () => {
    it('should create user and return token with initial categories and accounts', async () => {
        User.prototype.save = jest.fn().mockResolvedValue({
            _id: 'newUserId',
            email: 'new@example.com',
            toObject: () => ({ _id: 'newUserId', email: 'new@example.com' }),
        });
        jwt.sign = jest.fn().mockReturnValue('fakeToken');

        const response = await request(app)
            .post('/auth/signup')
            .send({ email: 'new@example.com', password: 'password' });

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('token', 'fakeToken');
    });
});

describe('PUT /user/:id', () => {
    it('should update the user and return updated info', async () => {
        User.findByIdAndUpdate = jest.fn().mockResolvedValue({
            _id: 'userId',
            email: 'update@example.com',
            firstName: 'John',
            lastName: 'Doe',
        });

        const response = await request(app).put('/auth/user/userId').send({
            email: 'update@example.com',
            firstName: 'John',
            lastName: 'Doe',
        });

        expect(response.status).toBe(200);
        expect(response.body.email).toBe('update@example.com');
        expect(User.findByIdAndUpdate).toHaveBeenCalledWith(
            'userId',
            expect.any(Object),
            expect.any(Object)
        );
    });

    it('should return 404 if user not found', async () => {
        User.findByIdAndUpdate = jest.fn().mockResolvedValue(null);

        const response = await request(app).put('/auth/user/userId').send({
            email: 'update@example.com',
            firstName: 'John',
            lastName: 'Doe',
        });

        expect(response.status).toBe(404);
    });
});
