import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type OtpDocument = Otp & Document; // Define OtpDocument as a combination of Otp and Document

@Schema()
export class Otp {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  otp: string;

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const OtpSchema = SchemaFactory.createForClass(Otp);
