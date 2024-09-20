/* // src/sellers/sellers.controller.ts
import { Controller, Post, Get, Put, Delete, Body, Param, UseGuards, Req } from '@nestjs/common';
import { SellersService } from './sellers.service';
import { CreateSellerDto } from './dto/create-seller.dto';
import { UpdateSellerDto } from './dto/update-seller.dto';
//import { SelfRegisterSellerDto } from './dto/self-register-seller.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Role } from '../auth/roles.decorator';
import { RoleGuard } from '../auth/roles.guard';
import { Request } from 'express';
import { SelfRegisterSellerDto } from './dto/SelfRegisterSellerDto';

@Controller('sellers')
@UseGuards(JwtAuthGuard, RoleGuard)
export class SellersController {
  constructor(private readonly sellersService: SellersService) {}

  @Post()
  @Role('admin') // Only admins can create sellers
  async create(@Body() createSellerDto: CreateSellerDto) {
    return this.sellersService.create(createSellerDto);
  }

  @Post('register')
  async selfRegister(@Body() selfRegisterSellerDto: SelfRegisterSellerDto) {
    return this.sellersService.selfRegister(selfRegisterSellerDto);
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.sellersService.findById(id);
  }

  @Put(':id')
  @Role('admin') // Only admins can update sellers
  async update(
    @Param('id') id: string,
    @Body() updateSellerDto: UpdateSellerDto,
  ) {
    return this.sellersService.update(id, updateSellerDto);
  }

  @Delete(':id')
  @Role('admin') // Only admins can delete sellers
  async remove(@Param('id') id: string) {
    return this.sellersService.remove(id);
  }
}
 */
import { Controller, Post, Get, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { SellersService } from './sellers.service';
import { CreateSellerDto } from './dto/create-seller.dto';
import { UpdateSellerDto } from './dto/update-seller.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Role } from '../auth/roles.decorator';
import { RoleGuard } from '../auth/roles.guard';
import { SelfRegisterSellerDto } from './dto/SelfRegisterSellerDto';


@Controller('sellers')

export class SellersController {
  constructor(private readonly sellersService: SellersService) {}

  @Post('register')
  async selfRegister(@Body() selfRegisterSellerDto: SelfRegisterSellerDto) {
    return this.sellersService.selfRegister(selfRegisterSellerDto);
  }

  @Post()
  @Role('admin') // Only admins can create sellers
  @UseGuards(RoleGuard)
  @UseGuards(JwtAuthGuard)
  async create(@Body() createSellerDto: CreateSellerDto) {
    return this.sellersService.create(createSellerDto);
  }

 
  @Get(':id')
  @UseGuards(JwtAuthGuard) // Ensure that only authenticated users can access
  async findById(@Param('id') id: string) {
    return this.sellersService.findById(id);
  }

  @Put(':id')
  @Role('admin') // Only admins can update sellers
  @UseGuards(RoleGuard, JwtAuthGuard)
  async update(
    @Param('id') id: string,
    @Body() updateSellerDto: UpdateSellerDto,
  ) {
    return this.sellersService.update(id, updateSellerDto);
  }

  @Delete(':id')
  @Role('admin') // Only admins can delete sellers
  @UseGuards(RoleGuard, JwtAuthGuard)
  async remove(@Param('id') id: string) {
    return this.sellersService.remove(id);
  }
}
