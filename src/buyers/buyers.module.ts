// src/buyers/buyers.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BuyerSchema } from './schema/buyers.schema';
import { BuyersService } from './buyers.service';
import { BuyersController } from './buyers.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Buyer.name', schema: BuyerSchema }])],
  providers: [BuyersService],
  controllers: [BuyersController],
  exports: [BuyersService], // Make sure to export BuyersService
})
export class BuyersModule {}
