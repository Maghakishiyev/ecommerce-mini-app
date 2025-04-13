import mongoose, { Schema, Document } from 'mongoose';
import { IUser } from './interface';

const userSchema = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phoneNumber: { type: String, required: false },
    fullName: { type: String, required: false },
    birthday: { type: String, required: false },
    address: { type: String, required: false },
    idCard: { type: String, required: false },
    apartment: { type: String, required: false },
    city: { type: String, required: false },
    country: { type: String, required: false },
});

export const User = mongoose.model<IUser & Document>('User', userSchema);
