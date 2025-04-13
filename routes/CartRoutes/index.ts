import { Router } from 'express';
import * as CartController from '@/controllers/CartController';  // Import the cart controller functions
import { authCheck } from '@/middleware/authCheck';  // Assuming you have a middleware for authentication

const router = Router();

router.get('/carts', authCheck, CartController.getCart);

router.post('/carts/add', authCheck, CartController.addCartItem);

router.delete('/carts/delete/:itemId', authCheck, CartController.deleteCartItem);

export default router;
