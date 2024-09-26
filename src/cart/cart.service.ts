/* import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CartDocument} from './schema/cart.schema';
import { CreateCartDto } from './dto/create-cart-item.dto';
import { CartItem } from './interface/cart-item.interface';

@Injectable()
export class CartService {
  constructor(
    @InjectModel('Cart') private readonly cartModel: Model<CartDocument>,
  ) {}

  async getCart(buyerId: string): Promise<CartDocument | null> {
    return this.cartModel.findOne({ buyer: buyerId }).populate('items.product').exec();
  }

  async getCartItemsByBuyer(buyerId: string): Promise<CartItem[]> {
    const cart = await this.getCart(buyerId);
    
    if (!cart || !cart.items) {
      return []; // Return an empty array if no cart is found
    }
    
    return cart.items; // Return the items in the cart
  }

  async addToCart(buyerId: string, createCartDto: CreateCartDto): Promise<CartDocument> {
    try {
      const cart = await this.getCart(buyerId) || new this.cartModel({ buyer: buyerId, items: [] });
    
      const existingProduct = cart.items.find(item => item.product.toString() === createCartDto.product.toString());
    
      if (existingProduct) {
        existingProduct.quantity += createCartDto.quantity;
      } else {
        cart.items.push({ product: new Types.ObjectId(createCartDto.product), quantity: createCartDto.quantity });
      }
    
      const savedCart = await cart.save();
      console.log('Cart saved successfully:', savedCart);
      return savedCart;
    } catch (error) {
      console.error('Error saving cart:', error);
      throw error;
    }
    
  }

  async updateCart(buyerId: string, productId: string, quantity: number): Promise<CartDocument> {
    const cart = await this.getCart(buyerId);
    if (!cart) throw new NotFoundException('Cart not found');

    const productInCart = cart.items.find(item => item.product.toString() === productId);
    if (!productInCart) throw new NotFoundException('Product not found in cart');

    productInCart.quantity = quantity;
    return cart.save();
  }

  /* async removeFromCart(buyerId: string, productId: string): Promise<CartDocument> {
    const cart = await this.getCart(buyerId);
    if (!cart) throw new NotFoundException('Cart not found');

    cart.items = cart.items.filter(item => item.product.toString() !== productId);
    return cart.save();
  }

  async clearCart(buyerId: string): Promise<CartDocument> {
    return this.cartModel.findOneAndDelete({ buyer: buyerId });
  } 
    async removeFromCart(buyerId: string, productId: string): Promise<CartDocument> {
      console.log('Buyer ID:', buyerId);
      
      const trimmedProductId = productId.trim();
      console.log('Product ID:', trimmedProductId);
    
      // Validate the product ID format
      if (!Types.ObjectId.isValid(trimmedProductId)) {
        throw new BadRequestException('Invalid product ID format');
      }
    
      // Find the cart and remove the item
      const updatedCart = await this.cartModel.findOneAndUpdate(
        { buyer: buyerId },
        { $pull: { items: { product: trimmedProductId } } },
        { new: true } // Return the updated cart
      );
    
      if (!updatedCart) {
        throw new NotFoundException('Cart not found');
      }
    
      console.log('Updated Cart Items:', updatedCart.items);
      return updatedCart; // Return the updated cart
    }
    async clearCart(buyerId: string): Promise<string> {
      const cart = await this.cartModel.findOneAndDelete({ buyer: buyerId });
    
      if (!cart) {
        throw new NotFoundException('Cart not found');
      }
    
      return 'Cart cleared successfully';
    }
}
 */
/* import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CartDocument } from './schema/cart.schema';
import { CreateCartDto } from './dto/create-cart-item.dto';
import { CartItem } from './interface/cart-item.interface';

@Injectable()
export class CartService {
  constructor(
    @InjectModel('Cart') private readonly cartModel: Model<CartDocument>,
  ) {}

  async getCart(buyerId: string): Promise<CartDocument | null> {
    return this.cartModel.findOne({ buyer: buyerId }).populate('items.product').exec();
  }

  async getCartItemsByBuyer(buyerId: string): Promise<CartItem[]> {
    const cart = await this.getCart(buyerId);
    return cart?.items || []; // Return items or an empty array if no cart is found
  }

  async addToCart(buyerId: string, createCartDto: CreateCartDto): Promise<CartDocument> {
    const cart = await this.getCart(buyerId) || new this.cartModel({ buyer: buyerId, items: [] });

    const existingProduct = cart.items.find(item => item.product.toString() === createCartDto.product.toString());

    if (existingProduct) {
      existingProduct.quantity += createCartDto.quantity;
    } else {
      cart.items.push({ product: new Types.ObjectId(createCartDto.product), quantity: createCartDto.quantity });
    }

    return await cart.save();
  }

  async updateCart(buyerId: string, productId: string, quantity: number): Promise<CartDocument> {
    const cart = await this.getCart(buyerId);
    console.log(buyerId)
    if (!cart) throw new NotFoundException('Cart not found');

    const productInCart = cart.items.find(item => item.product.toString() === productId);
    if (!productInCart) throw new NotFoundException('Product not found in cart');

    productInCart.quantity = quantity;
    return await cart.save();
  }

  async removeFromCart(buyerId: string, productId: string): Promise<CartDocument> {
    const trimmedProductId = productId.trim();

    // Validate the product ID format
    if (!Types.ObjectId.isValid(trimmedProductId)) {
      throw new BadRequestException('Invalid product ID format');
    }

    const cart = await this.getCart(buyerId);
    console.log(buyerId)
    if (!cart) throw new NotFoundException('Cart not found');

    const initialLength = cart.items.length;
    cart.items = cart.items.filter(item => item.product.toString() !== trimmedProductId);

    if (cart.items.length === initialLength) {
      throw new NotFoundException('Product not found in cart');
    }

    return await cart.save();
  }

  async clearCart(buyerId: string): Promise<string> {
    const cart = await this.cartModel.findOneAndDelete({ buyer: buyerId });
    if (!cart) throw new NotFoundException('Cart not found');

    return 'Cart cleared successfully';
  }
}
 */
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CartDocument } from './schema/cart.schema';
import { CreateCartDto } from './dto/create-cart-item.dto';
import { CartItem } from './interface/cart-item.interface';
import { Product } from 'src/products/schema/products.schema';

@Injectable()
export class CartService {
  constructor(
    @InjectModel('Cart') private readonly cartModel: Model<CartDocument>,
    @InjectModel('Product')private readonly productModel: Model<Product>,
  ) {}

  async getCart(buyerId: string): Promise<CartDocument | null> {
    return this.cartModel.findOne({ buyer: buyerId }).populate('items.product').exec();
  }

  async addToCart(buyerId: Types.ObjectId, createCartDto: CreateCartDto) {
    // Validate the product exists
    const productId = new Types.ObjectId(createCartDto.product); // Convert to ObjectId
    const productExists = await this.productModel.findById(productId);
    
    if (!productExists) {
      throw new NotFoundException('Product not found');
    }

    // Find the cart for the buyer
    const cart = await this.cartModel.findOne({ buyer: buyerId });

    if (cart) {
      const itemIndex = cart.items.findIndex(item => item.product.toString() === productId.toString());

      if (itemIndex > -1) {
        // If the product exists in the cart, update the quantity
        cart.items[itemIndex].quantity += createCartDto.quantity;
      } else {
        // If the product doesn't exist, add a new item
        cart.items.push({
          product: productId, // Now using ObjectId
          quantity: createCartDto.quantity,
        });
      }
      // Save the updated cart
      return cart.save();
    } else {
      // Create a new cart if none exists
      const newCart = new this.cartModel({
        buyer: buyerId,
        items: [{
          product: productId, // Now using ObjectId
          quantity: createCartDto.quantity,
        }],
      });
      return newCart.save();
    }
  }
  async updateCart(buyerId: string, productId: string, quantity: number): Promise<CartDocument> {
    const cart = await this.getCart(buyerId);
    if (!cart) throw new NotFoundException('Cart not found');

    const productInCart = cart.items.find(item => item.product.toString() === productId);
    if (!productInCart) throw new NotFoundException('Product not found in cart');

    productInCart.quantity = quantity;
    return await cart.save();
  }

  async removeFromCart(buyerId: string, productId: string): Promise<CartDocument> {
    console.log('Buyer ID:', buyerId);
    console.log('Product ID:', productId);
    
    const trimmedProductId = productId.trim();
    
   
    if (!Types.ObjectId.isValid(trimmedProductId)) {
        throw new BadRequestException('Invalid product ID format');
    }
    
  
    const cart = await this.cartModel.findOne({ buyer: buyerId });
    console.log('Cart:', cart); 
    
    if (!cart) {
        throw new NotFoundException('Cart not found');
    }

    
    const productIndex = cart.items.findIndex(item => item.product.toString() === trimmedProductId);
    
  
    if (productIndex === -1) {
        throw new NotFoundException('Product not found in cart');
    }

    cart.items.splice(productIndex, 1); 
    
    console.log('Updated Cart Items:', cart.items);
    
    // Save the updated cart
    return await cart.save();
}



}
