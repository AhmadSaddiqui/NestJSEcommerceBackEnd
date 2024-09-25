 // src/products/products.controller.ts
import { Controller, Post, Get, Put, Delete, Body, Param, UseGuards, Req, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Request } from 'express';

@Controller('products')
@UseGuards(JwtAuthGuard) 
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async create(
    @Body() createProductDto: CreateProductDto,
    @UploadedFile() file: Express.Multer.File,
    @Req() req: Request,
  ) {
    const userId = req.user.userId; 
    const image = file ? file.buffer.toString('base64') : createProductDto.image;
    return this.productsService.create({ ...createProductDto, image }, userId);
  }
  @Get('name/:title')
  async findByName(@Param('title') title: string) {
    return this.productsService.findByName(title);
  }

  @Get()
  async findAll(@Req() req: Request) {
    console.log('Request User:', req.user); // Ensure userId is now defined
    const userId = req.user.userId; // This should now be populated
    const userRole = req.user.role;
    return this.productsService.findAll(userId, userRole);
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.productsService.findById(id);
  }

  @Put(':id')
  async updateProduct(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
    @Req() req: Request
  ) {
    const userId = req.user.userId; // Ensure that the seller is updating their own product
   
    return this.productsService.update(id, updateProductDto, userId);
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Req() req: Request) {
    const userId = req.user.userId; // Ensure that the seller is deleting their own product
    return this.productsService.remove(id, userId);
  }
}
 
// src/products/products.controller.ts
/* import { Controller, Post, Get, Put, Delete, Body, Param, UseGuards, Req, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Request } from 'express';
import { Product } from './schema/products.schema';

@Controller('products')
@UseGuards(JwtAuthGuard) 
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async create(
    @Body() createProductDto: CreateProductDto,
    @UploadedFile() file: Express.Multer.File,
    @Req() req: Request,
  ) {
    const userId = req.user.userId; 
    const image = file ? file.buffer.toString('base64') : createProductDto.image;
    return this.productsService.create({ ...createProductDto, image }, userId);
  }

  @Get()
  async findAll(@Req() req: Request) {
    const userId = req.user.userId;
    const userRole = req.user.role;
    return this.productsService.findAll(userId, userRole);
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.productsService.findById(id);
  }

  @Put(':id')
  async updateProduct(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
    @Req() req: Request
  ) {
    const userId = req.user.userId; // Ensure that the seller is updating their own product
    return this.productsService.update(id, updateProductDto, userId);
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Req() req: Request) {
    const userId = req.user.userId; // Ensure that the seller is deleting their own product
    return this.productsService.remove(id, userId);
  }
}
 */