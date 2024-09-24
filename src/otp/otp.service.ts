import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Otp, OtpDocument } from './otp.schema';

@Injectable()
export class OtpService {
  constructor(@InjectModel(Otp.name) private otpModel: Model<OtpDocument>) {}

  async createOtp(email: string, otp: string): Promise<OtpDocument> {
    const newOtp = new this.otpModel({ email, otp });
    return await newOtp.save();
  }

  async findOtpByEmail(email: string): Promise<OtpDocument | null> {
    return await this.otpModel.findOne({ email }).exec();
  }

  async deleteOtp(email: string): Promise<void> {
    await this.otpModel.deleteOne({ email }).exec();
  }
  async validateOtp(email: string, otp: string): Promise<boolean> {
    const otpEntry = await this.findOtpByEmail(email);
    if (!otpEntry) {
      throw new NotFoundException('No OTP found for this email');
    }

    // Check if the OTP matches and has not expired (optional)
    const isOtpValid = otpEntry.otp === otp;

    // Optional: You may want to add expiration logic
    const isExpired = Date.now() - otpEntry.createdAt.getTime() > 5 * 60 * 1000; // 5 minutes
    if (isExpired) {
      await this.deleteOtp(email); // Optionally remove expired OTP
      throw new BadRequestException('OTP has expired');
    }

    return isOtpValid;
  }
}
