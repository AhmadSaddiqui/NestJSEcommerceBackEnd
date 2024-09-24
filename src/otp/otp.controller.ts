import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { OtpService } from './otp.service';

@Controller('otp')
export class OtpController {
  constructor(private readonly otpService: OtpService) {}

  @Post('create')
  async createOtp(@Body('email') email: string, @Body('otp') otp: string): Promise<string> {
    await this.otpService.createOtp(email, otp);
    return 'OTP created successfully';
  }

  @Get(':email')
  async getOtp(@Param('email') email: string) {
    const otpRecord = await this.otpService.findOtpByEmail(email);
    if (!otpRecord) {
      return { message: 'No OTP found for this email', statusCode: 404 };
    }
    return otpRecord;
  }
}
