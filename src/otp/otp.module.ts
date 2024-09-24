import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Otp, OtpSchema } from './otp.schema';
import { OtpService } from './otp.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Otp.name, schema: OtpSchema }]), // Register the Otp model
  ],
  providers: [OtpService],
  exports: [OtpService], // Export the OtpService if it's needed in other modules
})
export class OtpModule {}
