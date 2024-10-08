// auth.module.ts
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { BuyersModule } from 'src/buyers/buyers.module';
import { SellersModule } from 'src/sellers/sellers.module';
import { AuthController } from './auth.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './jwt.strategy';
import { OrdersModule } from 'src/orders/orders.module';
import { CartModule } from 'src/cart/cart.module';
import { PaymentsModule } from 'src/payments/payments.module';
import { EmailModule } from './email.module';
import { OtpModule } from 'src/otp/otp.module';
import { PendingRegistrationModule } from 'src/pending-registration/pending-registration.module';

@Module({
  imports: [
    UsersModule,
    SellersModule,
    BuyersModule,
    OrdersModule,
    CartModule,
    PaymentsModule,
    EmailModule,
    OtpModule,
    PendingRegistrationModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '60m' },
         
      }),
    }),
  ],
  providers: [AuthService,JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}

