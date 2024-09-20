/* // src/products/schemas/product.schema.ts
import { Schema, Document } from 'mongoose';

export interface Product extends Document {
  title: string;
  price: number;
  description: string;
  quantity: number;
  tags?: string[];
  image?: string; // Base64 encoded image
  seller?: Schema.Types.ObjectId; // Optional reference to user
}

export const ProductSchema = new Schema<Product>({
  title: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  quantity: { type: Number, required: true },
  tags: { type: [String], default: [] },
  image: { type: String, default: '' }, // Base64 encoded image
  seller: { type: Schema.Types.ObjectId, ref: 'User', required: false }, // Optional reference to user
});
 */
// src/products/schemas/product.schema.ts
import { Schema, Document } from 'mongoose';

export interface Product extends Document {
  title: string;
  price: number;
  description: string;
  quantity: number;
  tags?: string[];
  image?: string; // Base64 encoded image
  seller: Schema.Types.ObjectId; // Reference to seller
}

export const ProductSchema = new Schema<Product>({
  title: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  quantity: { type: Number, required: true },
  tags: { type: [String], default: [] },
  image: { type: String, default: '' }, // Base64 encoded image
  seller: { type: Schema.Types.ObjectId, ref: 'Seller', required: true }, // Reference to seller
});
