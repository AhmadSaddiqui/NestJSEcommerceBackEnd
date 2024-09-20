// src/products/products.service.ts
import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from './schema/products.schema';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel('Product') private readonly productModel: Model<Product>,
  ) {}

  async create(createProductDto: CreateProductDto, sellerId: string): Promise<Product> {
    const newProduct = new this.productModel({
      ...createProductDto,
      seller: sellerId,
    });
    return await newProduct.save();
  }

  // Modified findAll to only return seller's own products
 /*  async findAll(userId: string, role: string): Promise<Product[]> {
    if (role === 'admin') {
      // Admin can see all products
      // return await this.productModel.find().exec();
    } else if (role === 'seller') {
      // Seller can only see their own products
      console.log("Seller", userId)
      return await this.productModel.find({ seller: userId }).exec();
    } else {
      // For other roles, no products are shown (you can modify this for buyers)
      return [];
    }
  } */
    async findAll(userId: string, userRole: string): Promise<Product[]> {
      if (userRole === 'admin' || userRole === 'buyer') {
        return this.productModel.find().exec(); // All products for admin and buyers
      } else if (userRole === 'seller') {
        return this.productModel.find({ seller: userId }).exec(); // Seller's products
      }
      return [];
    }

  async findById(id: string): Promise<Product> {
    const product = await this.productModel.findById(id).exec();
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return product;
  }

  async update(id: string, updateProductDto: UpdateProductDto, sellerId: string): Promise<Product> {
    const product = await this.productModel.findById(id).exec();
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    if (product.seller.toString() !== sellerId) {
      throw new ForbiddenException('You are not allowed to update this product');
    }

    Object.assign(product, updateProductDto);
    return await product.save();
  }

  async remove(id: string, sellerId: string): Promise<void> {
    const product = await this.productModel.findById(id).exec();
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    if (product.seller.toString() !== sellerId) {
      throw new ForbiddenException('You are not allowed to delete this product');
    }

    await this.productModel.findByIdAndDelete(id).exec();
  }
}
