import { Schema } from "mongoose";
import { ICartItem } from "./interface";

export const CartItemSchema = new Schema<ICartItem>({
    product_id: { type: String, required: true },
    selected_color: { type: String, required: true },
    selected_memory_size: { type: String, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
});