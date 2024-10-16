import { Controller, Post, Get, Put, Delete, Body, Param, UseGuards, Req, UploadedFile, UseInterceptors, Query, BadGatewayException } from '@nestjs/common';
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

    if (!file) {
      throw new BadGatewayException('Image file is required');
    }

    return this.productsService.create(createProductDto, userId, file.buffer);
  }

  @Get('name/:title')
  async findByName(@Param('title') title: string) {
    return this.productsService.findByName(title);
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
    const userId = req.user.userId;
    return this.productsService.update(id, updateProductDto, userId);
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Req() req: Request) {
    const userId = req.user.userId;
    return this.productsService.remove(id, userId);
  }

  // Route to generate tags from the uploaded image
  @Post('generate-tags')
  async generateTags(@Body('image') image: string) {
    return this.productsService.generateTagsFromImage(image);
  }

  // Route to search products by the generated tags with a minimum of 5 matches
  @Get('search/tags')
  async searchByTags(@Query('tags') tags: string[]) {
    return this.productsService.searchByTags(tags);
  }
}
