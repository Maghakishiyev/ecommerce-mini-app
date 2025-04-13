import mongoose, { Schema } from 'mongoose';
import { IProduct } from './interface';

const productSchema: Schema = new Schema({
    price: { type: Number, required: true },
    name: { type: String, required: true },
    description: { type: String },
    available_memory: [{ type: String }],
    available_colors: [{ type: String }],
    details: {
        screenSize: { type: String },
        cpu: { type: String },
        numberOfCores: { type: Number },
        mainCamera: { type: String },
        frontCamera: { type: String },
        batteryCapacity: { type: String }
    },
    detail_description: { type: String },
    promotion_description: { type: String },
    product_image_url: { type: String }
}, { timestamps: true });

export const Product = mongoose.model<IProduct>('Product', productSchema);
