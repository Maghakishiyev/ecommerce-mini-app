import { ICartItem } from "../cartItem/interface";

export interface ICart extends Document {
    user_id: string;
    cart_items: ICartItem[]; 
    total_price: number; 
}