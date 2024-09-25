import { Types } from 'mongoose';

export interface CartItem {
  _id: Types.ObjectId; // Add _id field
  product: Types.ObjectId; // Ensure this is of type ObjectId
  quantity: number;
}
