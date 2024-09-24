/* import { Schema, Document, model } from 'mongoose';

// Define the Order Document interface
export interface OrderDocument extends Document {
  buyer: Schema.Types.ObjectId; // Reference to Buyer
  seller: Schema.Types.ObjectId; // Reference to Seller (via Product)
  product: Schema.Types.ObjectId; // Reference to Product
  quantity: number;
  totalPrice: number;
  status: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// Define the Order Schema
const OrderSchema = new Schema<OrderDocument>({
  buyer: { type: Schema.Types.ObjectId, ref: 'Buyer', required: true },
  seller: { type: Schema.Types.ObjectId, ref: 'Seller', required: true },
  product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
  quantity: { type: Number, required: true },
  totalPrice: { type: Number, required: true },
  status: { type: String, default: 'pending' }, // Possible statuses: pending, shipped, completed, etc.
}, { timestamps: true });  // Automatically adds createdAt and updatedAt

// Export the schema and model
export const OrderModel = model<OrderDocument>('Order', OrderSchema);
export { OrderSchema };
 */
import { Schema, Document, model } from 'mongoose';

// Define the Order Document interface
export interface OrderDocument extends Document {
  buyer: Schema.Types.ObjectId; // Reference to Buyer
  seller: Schema.Types.ObjectId; // Reference to Seller (via Product)
  product: Schema.Types.ObjectId; // Reference to Product
  quantity: number;
  totalPrice: number;
  status: string;
  paymentIntentId?: string; // Optional field for payment tracking
  createdAt?: Date;
  updatedAt?: Date;
}

// Define the Order Schema
const OrderSchema = new Schema<OrderDocument>(
  {
    buyer: { type: Schema.Types.ObjectId, ref: 'Buyer', required: true },
    seller: { type: Schema.Types.ObjectId, ref: 'Seller', required: true },
    product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
    status: { type: String, default: 'pending' }, // Possible statuses: pending, shipped, completed, etc.
    paymentIntentId: { type: String, required: false } // Add this field
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt
);

// Export the schema and model
export const OrderModel = model<OrderDocument>('Order', OrderSchema);
export { OrderSchema };
