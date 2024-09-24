/* // src/buyers/schema/buyers.schema.ts
import { Document, Schema, model } from 'mongoose';

// Define the Buyer interface extending Mongoose's Document
export interface BuyerDocument extends Document {
  _id: string;
  email: string;
  password: string;
  address?: string;
  phoneNumber?: string;
  firstName?: string;
  lastName?: string;
  role: string;
}

// Define the schema for Buyer
const BuyerSchema = new Schema<BuyerDocument>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  address: { type: String },
  phoneNumber: { type: String },
  firstName: { type: String },
  lastName: { type: String },
  role: { type: String, default: 'buyer' },
});

// Export the model and schema
export const BuyerModel = model<BuyerDocument>('Buyer', BuyerSchema);
export { BuyerSchema };
 */
import { Document, Schema, model } from 'mongoose';

// Define the Buyer interface extending Mongoose's Document
export interface BuyerDocument extends Document {
  _id: string;
  email: string;
  password: string;
  address?: string;
  phoneNumber?: string;
  firstName?: string;
  lastName?: string;
  role: string;
}

// Define the schema for Buyer
const BuyerSchema = new Schema<BuyerDocument>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  address: { type: String },
  phoneNumber: { type: String },
  firstName: { type: String },
  lastName: { type: String },
  role: { type: String, default: 'buyer' },

});

// Export the model and schema
export const BuyerModel = model<BuyerDocument>('Buyer', BuyerSchema);
export { BuyerSchema };
