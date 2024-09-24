/* import { Schema, Document } from 'mongoose';

export interface Seller extends Document {
  readonly email: string;
  readonly password: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly role: string;
  readonly shopName: string;
  readonly address?: string;
  readonly phoneNumber?: string;
}

export const SellerSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  role: { type: String, default: 'seller' }, // Default role for sellers
  shopName: { type: String, required: true },
  address: { type: String, default: '' },
  phoneNumber: { type: String, default: '' },
});
 */
 import { Schema, Document } from 'mongoose';

// Define the Seller interface
export interface Seller extends Document {
  readonly email: string;
  readonly password: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly role: string;
  readonly shopName: string;
  readonly address?: string;
  readonly phoneNumber?: string;
  
  
}

// Create the Seller schema
export const SellerSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  role: { type: String, default: 'seller' }, // Default role for sellers
  shopName: { type: String, required: true },
  address: { type: String, default: '' },
  phoneNumber: { type: String, default: '' },


  
});

// Export the SellerDocument type
export type SellerDocument = Seller & Document;
 
/* import { Schema, Document } from 'mongoose';

// Define the Seller interface
export interface Seller extends Document {
  readonly email: string;
  readonly password: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly role: string;
  readonly shopName: string;
  readonly address?: string;
  readonly phoneNumber?: string;
}

// Create the Seller schema
export const SellerSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  role: { type: String, default: 'seller' }, // Default role for sellers
  shopName: { type: String, required: true },
  address: { type: String, default: '' },
  phoneNumber: { type: String, default: '' },
});

// Export the SellerDocument type
export type SellerDocument = Seller & Document;
 */