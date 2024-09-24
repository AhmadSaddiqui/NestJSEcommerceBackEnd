// src/buyers/buyers.controller.ts
import { Controller, Post, Get, Put, Delete, Body, Param, Req, UseGuards } from '@nestjs/common';
import { BuyersService } from './buyers.service';
import { CreateBuyerDto } from './dto/create-buyer.dto';
import { UpdateBuyerDto } from './dto/update-buyer.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Request } from 'express';

@Controller('buyers')

export class BuyersController {
  constructor(private readonly buyersService: BuyersService) {}

  @Post('register')
  async create(@Body() createBuyerDto: CreateBuyerDto) {
    return this.buyersService.create(createBuyerDto);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findById(@Param('id') id: string) {
    return this.buyersService.findById(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateBuyerDto: UpdateBuyerDto,
  ) {
    return this.buyersService.update(id, updateBuyerDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.buyersService.remove(id);
  }
}
