import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { OrderSchema, OrderModel } from './schema/orders.schema';
import { ProductsModule } from '../products/products.module'; // For accessing product details
import { BuyersModule } from '../buyers/buyers.module'; // For accessing buyer details
import { SellersModule } from '../sellers/sellers.module'; // Optional, for seller details
import { CartModule } from 'src/cart/cart.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: OrderModel.modelName, schema: OrderSchema }]),
    ProductsModule, // Inject ProductService for product validation
    BuyersModule, // Inject BuyersService for buyer validation
    SellersModule,
    CartModule 
  ],
  controllers: [OrdersController],
  providers: [OrdersService],
  exports: [OrdersService],
})
export class OrdersModule {}
