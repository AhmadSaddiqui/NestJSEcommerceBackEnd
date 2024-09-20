import { Types } from 'mongoose';

export interface CartItem {
  product: Types.ObjectId; // Ensure this is of type ObjectId
  quantity: number;
}
