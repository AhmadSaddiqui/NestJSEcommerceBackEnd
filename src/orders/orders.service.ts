import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { OrderDocument } from './schema/orders.schema';
import { CreateOrderDto } from './dto/create-order.dto';
import { ProductsService } from '../products/products.service';
import { CartService } from 'src/cart/cart.service';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel('Order') private readonly orderModel: Model<OrderDocument>,
    private readonly productService: ProductsService,
    private readonly cartSrvice : CartService
  ) {}

  async createOrder(createOrderDto: CreateOrderDto, buyerId: string): Promise<OrderDocument> {
    const { productId, quantity } = createOrderDto;

    // Validate that the product exists
    const product = await this.productService.findById(productId);
    if (!product) {
      throw new NotFoundException('Product not found');
    }

    // Check if quantity requested exceeds product stock
    if (quantity > product.quantity) {
      throw new BadRequestException('Not enough product stock available');
    }

    // Calculate total price
    const totalPrice = product.price * quantity;

    // Create the order, associating the buyer and seller
    const newOrder = new this.orderModel({
      buyer: buyerId,
      seller: product.seller, // Uses the `seller` field in the product schema
      product: product._id,
      quantity,
      totalPrice,
      status: 'pending',
    });

    // Reduce the product quantity
    product.quantity -= quantity;
    await product.save();

    return await newOrder.save();
  }

  // Get all orders for a specific buyer
  async getOrdersByBuyer(buyerId: string): Promise<OrderDocument[]> {
    return this.orderModel.find({ buyer: buyerId }).populate('product').exec();
  }

  // Get all orders for a specific seller
  async getOrdersBySeller(sellerId: string): Promise<OrderDocument[]> {
    return this.orderModel.find({ seller: sellerId }).populate('product').exec();
  }

  // Get all orders (for Admin)
  async getAllOrders(): Promise<OrderDocument[]> {
    return this.orderModel.find().populate('buyer seller product').exec();
  }
  

  // Update the status of an order (for Seller)
  async updateOrderStatus(orderId: string, status: string): Promise<OrderDocument> {
    const order = await this.orderModel.findById(orderId);
    if (!order) {
      throw new NotFoundException('Order not found');
    }

    // Update the order status
    order.status = status;
    return await order.save();
  }
 /*  async placeOrderFromCart(buyerId: string): Promise<OrderDocument[]> {
    // Step 1: Retrieve the buyer's cart items
    const cartItems = await this.cartSrvice.getCartItemsByBuyer(buyerId);
    
    if (!cartItems || cartItems.length === 0) {
      throw new BadRequestException('Cart is empty');
    }

    const orders: OrderDocument[] = [];

    // Step 2: Process each cart item
    for (const item of cartItems) {
      const { product: productId, quantity } = item;

      // Validate that the product exists
      const product = await this.productService.findById(productId);
      if (!product) {
        throw new NotFoundException(`Product with ID ${productId} not found`);
      }

      // Check if quantity requested exceeds product stock
      if (quantity > product.quantity) {
        throw new BadRequestException(`Not enough stock for product ID ${productId}`);
      }

      // Calculate total price
      const totalPrice = product.price * quantity;

      // Create the order
      const newOrder = new this.orderModel({
        buyer: buyerId,
        seller: product.seller, // Use the seller from the product
        product: product._id,
        quantity,
        totalPrice,
        status: 'pending',
      });

      // Save the new order
      orders.push(await newOrder.save());

      // Reduce the product quantity
      product.quantity -= quantity;
      await product.save();
    }

    // Optionally: Clear the cart after placing the order
    await this.cartSrvice.clearCart(buyerId);

    return orders; // Return the created orders
  } */
}
