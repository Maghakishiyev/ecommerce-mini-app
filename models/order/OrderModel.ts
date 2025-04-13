
import mongoose, { Schema, Document } from 'mongoose';

export interface IOrder extends Document {
    user: string;
    items: { product: string; quantity: number; price: number }[];
    total: number;
    deliveryStatus: 'delivered' | 'pending' | 'canceled';
    deliveryDate?: Date;
    shipmentMethod: string;
}

const OrderSchema: Schema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    items: [
        {
            product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
            quantity: { type: Number, required: true },
            price: { type: Number, required: true },
        },
    ],
    total: { type: Number, required: true },
    deliveryStatus: { type: String, enum: ['delivered', 'pending', 'canceled'], required: true },
    deliveryDate: { type: Date },
});

export default mongoose.model<IOrder>('Order', OrderSchema);
    