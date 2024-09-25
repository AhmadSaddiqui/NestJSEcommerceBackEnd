/*  import { Controller, Post, Get, Delete, Body, Param, UseGuards, Request } from '@nestjs/common';
import { CartService } from './cart.service';
//import { CreateCartDto } from './dto/create-cart.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateCartDto } from './dto/create-cart-item.dto';
import { console } from 'inspector';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async getCart(@Request() req: any) {
    const buyerId = req.user.userId; // Ensure this is getting the correct user ID from the JWT
    return this.cartService.getCart(buyerId);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async addToCart(@Body() createCartDto: CreateCartDto, @Request() req: any) {
    const buyerId = req.user.userId;
    return this.cartService.addToCart(buyerId, createCartDto);
  }

  @Post(':id/update')
  @UseGuards(JwtAuthGuard)
  async updateCart(@Param('id') productId: string, @Body('quantity') quantity: number, @Request() req: any) {
    const buyerId = req.user.userId;
    return this.cartService.updateCart(buyerId, productId, quantity);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async removeFromCart(@Param('id') productId: string, @Request() req: any) {
    const buyerId = req.user.userId;
    console.log(buyerId)
    return this.cartService.removeFromCart(buyerId, productId);
  }
  
  @Delete('clear')
  @UseGuards(JwtAuthGuard)
  async clearCart(@Request() req: any) {
    const buyerId = req.user.userId;
    console.log(buyerId)
    return this.cartService.clearCart(buyerId);
    
  }
}
  */
/* import { Controller, Post, Get, Delete, Body, Param, UseGuards, Request } from '@nestjs/common';
import { CartService } from './cart.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateCartDto } from './dto/create-cart-item.dto';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async getCart(@Request() req: any) {
    const buyerId = req.user.userId;
    return await this.cartService.getCart(buyerId);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async addToCart(@Body() createCartDto: CreateCartDto, @Request() req: any) {
    const buyerId = req.user.userId;
    return await this.cartService.addToCart(buyerId, createCartDto);
  }

  @Post(':id/update')
  @UseGuards(JwtAuthGuard)
  async updateCart(@Param('id') productId: string, @Body('quantity') quantity: number, @Request() req: any) {
    const buyerId = req.user.userId;
    return await this.cartService.updateCart(buyerId, productId, quantity);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async removeFromCart(@Param('id') productId: string, @Request() req: any) {
    const buyerId = req.user.userId;
    console.log(buyerId)
    return await this.cartService.removeFromCart(buyerId, productId);
  }

  @Delete('clear')
  @UseGuards(JwtAuthGuard)
  async clearCart(@Request() req: any) {
    const buyerId = req.user.userId;
    return await this.cartService.clearCart(buyerId);
  } 
}

*/
import { Controller, Post, Get, Delete, Body, Param, UseGuards, Request, BadRequestException } from '@nestjs/common';
import { CartService } from './cart.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateCartDto } from './dto/create-cart-item.dto';
import { console } from 'inspector';
import {Types} from 'mongoose'

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async getCart(@Request() req: any) {
    const buyerId = req.user.userId; // Ensure this is getting the correct user ID from the JWT
    return this.cartService.getCart(buyerId);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async addToCart(@Body() createCartDto: CreateCartDto, @Request() req: any) {
    const buyerId = req.user.userId;
    return this.cartService.addToCart(buyerId, createCartDto);
  }

  @Post(':id/update')
  @UseGuards(JwtAuthGuard)
  async updateCart(@Param('id') productId: string, @Body('quantity') quantity: number, @Request() req: any) {
    const buyerId = req.user.userId;
    return this.cartService.updateCart(buyerId, productId, quantity);
  }

  
  @Delete(':buyerId/items/:productId')
  async removeFromCart(
    @Param('buyerId') buyerId: string,
    @Param('productId') productId: string,
  ) {
    // Ensure buyerId and productId are valid ObjectIds
    if (!Types.ObjectId.isValid(buyerId) || !Types.ObjectId.isValid(productId)) {
      throw new BadRequestException('Invalid IDs provided');
    }
    console.log('Buyer ID byb byby:', buyerId);


    return this.cartService.removeFromCart(buyerId, productId);
  }

  
  @Delete('clear')
  @UseGuards(JwtAuthGuard)
  async clearCart(@Request() req: any) {
    const buyerId = req.user.userId;
    return this.cartService.clearCart(buyerId);
  }
}
