// src/sellers/sellers.service.ts

import { Injectable, NotFoundException, ConflictException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Seller } from './schema/sellers.schema';
import { CreateSellerDto } from './dto/create-seller.dto';
import { UpdateSellerDto } from './dto/update-seller.dto';
import { SelfRegisterSellerDto } from './dto/SelfRegisterSellerDto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class SellersService {
  constructor(@InjectModel('Seller.name') private sellerModel: Model<Seller>) {}

  async create(createSellerDto: CreateSellerDto): Promise<Seller> {
    const newSeller = new this.sellerModel(createSellerDto);
    return newSeller.save();
  }

  async selfRegister(selfRegisterSellerDto: SelfRegisterSellerDto): Promise<Seller> {
    const { email, shopName, password, firstName, lastName, address, phoneNumber } = selfRegisterSellerDto;

    // Check if a seller with the same email or shop name already exists
    const existingSellerByEmail = await this.sellerModel.findOne({ email }).exec();
    if (existingSellerByEmail) {
      throw new ConflictException('Seller with this email already exists');
    }

    const existingSellerByShopName = await this.sellerModel.findOne({ shopName }).exec();
    if (existingSellerByShopName) {
      throw new ConflictException('Seller with this shop name already exists');
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create and save the new seller
    const newSeller = new this.sellerModel({
      email,
      shopName,
      password: hashedPassword,
      firstName,
      lastName,
      address,
      phoneNumber,
    });
    return newSeller.save();
  }
  

  async findById(id: string): Promise<Seller> {
    const seller = await this.sellerModel.findById(id).exec();
    if (!seller) {
      throw new NotFoundException(`Seller with ID ${id} not found`);
    }
    return seller;
  }

  async findAll(): Promise<Seller[]> {
    return this.sellerModel.find().exec();
  }

  async findOne(id: string): Promise<Seller> {
    return this.sellerModel.findById(id).exec();
  }

  async update(id: string, updateSellerDto: UpdateSellerDto): Promise<Seller> {
    return this.sellerModel.findByIdAndUpdate(id, updateSellerDto, { new: true }).exec();
  }

  async remove(id: string): Promise<Seller> {
    return this.sellerModel.findByIdAndDelete(id).exec();
  }

  async findByEmail(email: string): Promise<Seller | null> {
    return this.sellerModel.findOne({ email }).exec();
  }
}
