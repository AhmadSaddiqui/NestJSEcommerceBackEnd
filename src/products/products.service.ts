import { Injectable, NotFoundException, ForbiddenException, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from './schema/products.schema';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { HttpService } from '@nestjs/axios'; // Use HttpService from @nestjs/axios
import { firstValueFrom } from 'rxjs'; // To handle observables returned by HttpService
import * as FormData from 'form-data';

@Injectable()
export class ProductsService {
  private imaggaApiKey = 'acc_2d1b8c44c6a251d'; // Your Imagga API key
  private imaggaApiSecret = 'a4bece68eb91e737f351872f7b5a7087'; // Your Imagga API secret

  constructor(
    @InjectModel('Product') private readonly productModel: Model<Product>,
    private readonly httpService: HttpService, // Inject HttpService
  ) {}
  async create(createProductDto: CreateProductDto, sellerId: string, imageBuffer: Buffer): Promise<Product> {
    const imaggaTags = await this.readImageUsingImagga(imageBuffer);
    const base64Image = imageBuffer.toString('base64');

    const newProduct = new this.productModel({
      ...createProductDto,
      seller: sellerId,
      tags: imaggaTags,
      image: base64Image,
    });

    return await newProduct.save();
  }
  

  // Method to read image and generate tags using Imagga API
  

  private async readImageUsingImagga(imageBuffer: Buffer): Promise<string[]> {
    const apiUrl = 'https://api.imagga.com/v2/tags';
    const base64Image = imageBuffer.toString('base64');

    const authHeader = 'Basic ' + Buffer.from(`${this.imaggaApiKey}:${this.imaggaApiSecret}`).toString('base64');
    const formData = new FormData();
    formData.append('image_base64', base64Image);

    try {
      const response = await firstValueFrom(
        this.httpService.post(apiUrl, formData, {
          headers: {
            'Authorization': authHeader,
            ...formData.getHeaders(),
          },
        })
      );
      
      const tags = response.data.result.tags.map(tag => tag.tag.en);
      return tags;
    } catch (error) {
      throw new HttpException('Failed to read image using Imagga API', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async generateTagsFromImage(base64Image: string): Promise<string[]> {
    return this.readImageUsingImagga(Buffer.from(base64Image, 'base64'));
  }

  // Other methods like findAll, findById, etc.
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

  async findByName(title: string): Promise<Product> {
    const product = await this.productModel.findOne({ title }).exec();
    if (!product) {
      throw new NotFoundException(`Product with name "${title}" not found`);
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
  async searchByTags(tags: string[]): Promise<Product[]> {
    const products = await this.productModel.aggregate([
      {
        $match: {
          tags: { $in: tags },  // Matches products with at least one tag in the tags array
        },
      },
      {
        $project: {
          title: 1,
          description: 1,
          price: 1,  // Add this to include price in the projection
          image: 1,  // Ensure image is also included
          tags: 1,
          matchingTagsCount: {
            $size: {
              $filter: {
                input: '$tags',
                as: 'tag',
                cond: { $in: ['$$tag', tags] },  // Count how many tags match
              },
            },
          },
        },
      },
      {
        $match: {
          matchingTagsCount: { $gte: 30 },  // Ensure at least 2 tags match
        },
      },
      {
        $sort: { matchingTagsCount: -1 },  // Sort by the number of matching tags in descending order
      },
      {
        $limit: 10  // Limit the number of products returned to 10 (adjust as needed)
      }
    ]);
  
    if (products.length === 0) {
      throw new NotFoundException('No products found with matching tags');
    }
  
    return products;
  }
  

}

