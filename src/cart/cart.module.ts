import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { CartSchema } from './schema/cart.schema';
import { CartModel } from './schema/cart.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Cart', schema: CartSchema }]), // Register Cart schema
  ],
  controllers: [CartController], // Register CartController
  providers: [CartService],
  exports : [CartService] // Register CartService
})
export class CartModule {}
