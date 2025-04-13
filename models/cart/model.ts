import mongoose, { Schema } from "mongoose";
import { ICart } from "./interface";
import { CartItemSchema } from "@/models/cartItem/model";

const CartSchema = new Schema<ICart>(
    {
        user_id: { type: String, required: true },
        cart_items: [CartItemSchema],
        total_price: { type: Number, default: 0 },
    },
    { timestamps: true }
);

export const Cart = mongoose.model<ICart>("Cart", CartSchema);
