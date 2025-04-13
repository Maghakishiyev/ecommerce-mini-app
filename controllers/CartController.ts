import { Request, Response } from 'express';
import { Cart } from '@/models/cart/model';  
import { validateCartItem } from '@/routes/CartRoutes/helpers/validateCart'; 

export const getCart = async (req: Request, res: Response) => {
    try {
        const { user_id, } = req.body;
        const userId = user_id;  
        const cart = await Cart.findOne({ userId }).populate('cartItems.product');  
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        const totalPrice = cart.cart_items.reduce((total, item) => total + (item.quantity * item.price), 0);

        return res.status(200).json({
            cart,
            totalPrice
        });
    } catch (error) {
        return res.status(500).json({ error: 'Failed to fetch cart' });
    }
};

export const addCartItem = async (req: Request, res: Response) => {
    try {
        const { user_id, product_id, selected_color, selected_memory_size, quantity, price } = req.body;

        const newItem = {
            product_id,
            selected_color,
            selected_memory_size,
            quantity,
            price,
        };

        // Validate the cart item
        const itemValidation = validateCartItem(newItem);
        if (!itemValidation.valid) {
            return res.status(400).json({ message: itemValidation.message });
        }

        let cart = await Cart.findOne({ user_id });

        if (!cart) {
            cart = new Cart({ user_id, cartItems: [] });
        }

        // Check if the item already exists in the cart
        const existingItemIndex = cart.cart_items.findIndex(item =>
            item.product_id.toString() === product_id &&
            item.selected_color === selected_color &&
            item.selected_memory_size === selected_memory_size
        );

        if (existingItemIndex !== -1) {
            // If the item already exists, update its quantity
            cart.cart_items[existingItemIndex].quantity += quantity;
        } else {
            // Otherwise, add the new item to the cart
            cart.cart_items.push(newItem);
        }

        // Save the updated cart
        await cart.save();

        return res.status(201).json({
            message: 'Item added to cart',
            cart
        });
    } catch (error) {
        return res.status(500).json({ error: 'Failed to add item to cart' });
    }
};

export const deleteCartItem = async (req: Request, res: Response) => {
    try {
        const { user_id } = req.body;  // Get user ID from the authenticated user

        const { itemId } = req.params;  // Get itemId from route params

        // Find the user's cart
        const cart = await Cart.findOne({ user_id });

        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        // Remove the item from the cart
        const updatedCartItems = cart.cart_items.filter(item => item.product_id.toString() !== itemId);

        if (updatedCartItems.length === cart.cart_items.length) {
            return res.status(404).json({ message: 'Item not found in cart' });
        }

        // Update the cart with the remaining items
        cart.cart_items = updatedCartItems;
        await cart.save();

        return res.status(200).json({
            message: 'Item removed from cart',
            cart
        });
    } catch (error) {
        return res.status(500).json({ error: 'Failed to delete item from cart' });
    }
};

// Add an item to the cart
export const addItem = async (req: Request, res: Response) => {
    try {
        const { user_id, product_id, selected_color, selected_memory_size, quantity, price } = req.body;
        const cart = await Cart.findOne({ user_id });
        const newItem = { product_id, selected_color, selected_memory_size, quantity, price };

        if (cart) {
            cart.cart_items.push(newItem);
            cart.total_price += price * quantity;
            await cart.save();
        } else {
            await Cart.create({
                user_id,
                cart_items: [newItem],
                total_price: price * quantity,
            });
        }
        res.status(200).json({ message: "Item added to cart successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error adding item to cart", error });
    }
};

// Remove an item from the cart
export const removeItem = async (req: Request, res: Response) => {
    try {
        const { user_id, product_id } = req.body;
        const cart = await Cart.findOne({ user_id });
        if (!cart) return res.status(404).json({ message: "Cart not found" });

        const itemIndex = cart.cart_items.findIndex((item) => item.product_id === product_id);
        if (itemIndex !== -1) {
            const item = cart.cart_items[itemIndex];
            cart.total_price -= item.price * item.quantity;
            cart.cart_items.splice(itemIndex, 1);
            await cart.save();
        }
        res.status(200).json({ message: "Item removed from cart successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error removing item from cart", error });
    }
};

// Clear all items from the cart
export const clearCart = async (req: Request, res: Response) => {
    try {
        const { user_id } = req.body;
        const cart = await Cart.findOne({ user_id });
        if (!cart) return res.status(404).json({ message: "Cart not found" });

        cart.cart_items = [];
        cart.total_price = 0;
        await cart.save();
        res.status(200).json({ message: "Cart cleared successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error clearing cart", error });
    }
};
