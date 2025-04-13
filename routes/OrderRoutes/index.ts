import express from 'express';
import {
    createOrder,
    getOrder,
    getAllOrders,
    updateOrder,
} from '@/controllers/OrdersController';
import { authCheck } from '@/middleware/authCheck';

const router = express.Router();

router.post('/', authCheck, createOrder); // Create a new order
router.get('/:id', authCheck, getOrder); // Get a specific order by ID
router.get('/', authCheck, getAllOrders); // Get all orders
router.put('/:id', authCheck, updateOrder); // Update an order's status or details

export default router;
