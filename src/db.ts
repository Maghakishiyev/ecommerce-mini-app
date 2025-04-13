import mongoose from 'mongoose';
import config from './config';

export async function dbConnection(): Promise<void> {
    try {
        await mongoose.connect(config.databaseUri);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB', error);
    }
}
