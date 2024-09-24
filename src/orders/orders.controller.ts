/* import { Controller, Post, Get, Body, Param, UseGuards, Request } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

 
  @Post()
@UseGuards(JwtAuthGuard)
async createOrder(@Body() createOrderDto: CreateOrderDto, @Request() req: any) {
  const buyerId = req.user.userId; // Accessing userId from the request
  console.log('Buyer ID:', buyerId); // Check if buyerId is now defined
  return this.ordersService.createOrder(createOrderDto, buyerId);
}

  @Get('buyer')
  @UseGuards(JwtAuthGuard)
  async getBuyerOrders(@Request() req: any) {
    const buyerId = req.user.id; // Assuming your JWT contains the user's ID
    return this.ordersService.getOrdersByBuyer(buyerId);
  }

  @Get('seller/:id')
  @UseGuards(JwtAuthGuard)
  async getSellerOrders(@Param('id') sellerId: string) {
    return this.ordersService.getOrdersBySeller(sellerId);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async getAllOrders() {
    return this.ordersService.getAllOrders();
  }

  @Post(':id/status')
  @UseGuards(JwtAuthGuard)
  async updateOrderStatus(@Param('id') orderId: string, @Body('status') status: string) {
    return this.ordersService.updateOrderStatus(orderId, status);
  }
}
 */
/* import { Controller, Post, Get, Body, Param, UseGuards, Request } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async createOrder(@Body() createOrderDto: CreateOrderDto, @Request() req: any) {
    const buyerId = req.user.userId; // Accessing userId from the request
    console.log('Buyer ID:', buyerId); // Check if buyerId is now defined
    return this.ordersService.createOrder(createOrderDto, buyerId);
  }

  @Get('buyer')
  @UseGuards(JwtAuthGuard)
  async getBuyerOrders(@Request() req: any) {
    const buyerId = req.user.userId; // Use userId from the request
    return this.ordersService.getOrdersByBuyer(buyerId);
  }

  @Get('seller')
  @UseGuards(JwtAuthGuard)
  async getSellerOrders(@Request() req: any) {
    const sellerId = req.user.userId; // Get the seller ID from the authenticated user
    return this.ordersService.getOrdersBySeller(sellerId);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async getAllOrders() {
    return this.ordersService.getAllOrders();
  }

  @Post(':id/status')
  @UseGuards(JwtAuthGuard)
  async updateOrderStatus(@Param('id') orderId: string, @Body('status') status: string) {
    return this.ordersService.updateOrderStatus(orderId, status);
  }
}
 */
import { Controller, Post, Get, Body, Param, UseGuards, Request } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { OrderDocument } from './schema/orders.schema';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async createOrder(@Body() createOrderDto: CreateOrderDto, @Request() req: any): Promise<OrderDocument> {
    const buyerId = req.user.userId; // Accessing userId from the request
    return this.ordersService.createOrder(createOrderDto, buyerId);
  }

  @Get('buyer')
  @UseGuards(JwtAuthGuard)
  async getBuyerOrders(@Request() req: any): Promise<OrderDocument[]> {
    const buyerId = req.user.userId;
    return this.ordersService.getOrdersByBuyer(buyerId);
  }

  @Get('seller')
  @UseGuards(JwtAuthGuard)
  async getSellerOrders(@Request() req: any): Promise<OrderDocument[]> {
    const sellerId = req.user.userId;
    return this.ordersService.getOrdersBySeller(sellerId);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async getAllOrders(): Promise<OrderDocument[]> {
    return this.ordersService.getAllOrders();
  }

  @Post(':id/status')
  @UseGuards(JwtAuthGuard)
  async updateOrderStatus(@Param('id') orderId: string, @Body('status') status: string): Promise<OrderDocument> {
    return this.ordersService.updateOrderStatus(orderId, status);
  }

  @Post(':id/payment-intent')
  @UseGuards(JwtAuthGuard)
  async createPaymentIntent(@Param('id') orderId: string) {
    return this.ordersService.createPaymentIntent(orderId);
  }

  @Post(':id/confirm-payment')
  @UseGuards(JwtAuthGuard)
  async confirmPayment(
    @Param('id') orderId: string,
    @Body('paymentIntentId') paymentIntentId: string
  ): Promise<OrderDocument> {
    return this.ordersService.confirmPayment(orderId, paymentIntentId);
  }
}
