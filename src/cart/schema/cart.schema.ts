import { Schema, Document, model, Types } from 'mongoose';

export interface CartItem {
  product: Types.ObjectId; // Reference to Product schema
  quantity: number;
}

export interface CartDocument extends Document {
  buyer: Types.ObjectId; // Reference to Buyer schema
  items: CartItem[];
}

// Define the Cart Schema
const CartSchema = new Schema<CartDocument>({
  buyer: { type: Schema.Types.ObjectId, ref: 'Buyer', required: true },
  items: [{
    product: { type: Schema.Types.ObjectId, ref: 'Product', required: true }, // Matches Product schema
    quantity: { type: Number, required: true, min: 1 }, // Minimum quantity validation
  }],
}, { timestamps: true }); // Optional timestamps

// Export the model and the schema
export const CartModel = model<CartDocument>('Cart', CartSchema);
export { CartSchema }; // Ensure CartSchema is exported
