/* import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Seller, SellerSchema } from './schema/sellers.schema';
import { SellersService } from './sellers.service';
import { SellersController } from './sellers.controller';
import { EmailModule } from 'src/auth/email.module';
import { OtpModule } from 'src/otp/otp.module';
import { EmailService } from 'src/auth/email.service';
import { OtpService } from 'src/otp/otp.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Seller.name', schema: SellerSchema }]), // Use Seller.name without quotes
    EmailModule,
    OtpModule,
  ],
  providers: [SellersService],
  controllers: [SellersController],
  exports: [SellersService],
})
export class SellersModule {}
 */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Seller, SellerSchema } from './schema/sellers.schema';
import { SellersService } from './sellers.service';
import { SellersController } from './sellers.controller';
import { EmailModule } from 'src/auth/email.module';
import { OtpModule } from 'src/otp/otp.module'; // Make sure this is imported
import { PendingRegistrationModule } from 'src/pending-registration/pending-registration.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Seller', schema: SellerSchema }]),
    EmailModule,
    OtpModule, // This should be included to access OtpService
    PendingRegistrationModule,
  ],
  providers: [SellersService],
  controllers: [SellersController],
  exports: [SellersService],
})
export class SellersModule {}
