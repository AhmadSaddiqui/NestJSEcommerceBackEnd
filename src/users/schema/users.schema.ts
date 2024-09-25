// src/users/schemas/user.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true, enum: ['admin', 'seller', 'buyer'], default: 'buyer' })  // Add role field
  role: string;
  @Prop({ type: Boolean, default: false }) // Use Boolean instead of boolean
  isAdmin: boolean;
}


export const UserSchema = SchemaFactory.createForClass(User);
