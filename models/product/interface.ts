import { Document} from 'mongoose';

export interface IProduct extends Document {
    id: number;
    price: number;
    name: string;
    description?: string;
    available_memory?: string[]; 
    available_colors?: string[]; 
    details?: {
        screenSize?: string;
        cpu?: string;
        numberOfCores?: number;
        mainCamera?: string;
        frontCamera?: string;
        batteryCapacity?: string;
        [key: string]: string | number | undefined; // Expandable details
    };
    detail_description?: string;
    promotion_description?: string;
    product_image_url?: string;
}
