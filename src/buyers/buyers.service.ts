import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BuyerDocument } from './schema/buyers.schema';
import { CreateBuyerDto } from './dto/create-buyer.dto';
import { UpdateBuyerDto } from './dto/update-buyer.dto';
import * as bcrypt from 'bcrypt';
//import { BuyerCreationAttrs } from './interface/buyer-creation.interface';

@Injectable()
export class BuyersService {
  constructor(
    @InjectModel('Buyer.name') private readonly buyerModel: Model<BuyerDocument>,
  ) {}

   async create(createBuyerDto: CreateBuyerDto): Promise<BuyerDocument> {
    const hashedPassword = await bcrypt.hash(createBuyerDto.password, 10);
    const newBuyer = new this.buyerModel({
      ...createBuyerDto,
      password: hashedPassword,
    });
    return newBuyer.save();
  }
 


  async findById(id: string): Promise<BuyerDocument> {
    const buyer = await this.buyerModel.findById(id).exec();
    if (!buyer) {
      throw new NotFoundException(`Buyer with ID ${id} not found`);
    }
    return buyer;
  }

  async update(id: string, updateBuyerDto: UpdateBuyerDto): Promise<BuyerDocument> {
    const buyer = await this.buyerModel.findByIdAndUpdate(id, updateBuyerDto, { new: true }).exec();
    if (!buyer) {
      throw new NotFoundException(`Buyer with ID ${id} not found`);
    }
    return buyer;
  }

  async remove(id: string): Promise<void> {
    const result = await this.buyerModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Buyer with ID ${id} not found`);
    }
  }

  async findByEmail(email: string): Promise<BuyerDocument | null> {
    return this.buyerModel.findOne({ email }).exec();
  }

  async validatePassword(email: string, password: string): Promise<BuyerDocument | null> {
    const buyer = await this.findByEmail(email);
    if (buyer && await bcrypt.compare(password, buyer.password)) {
      return buyer;
    }
    return null;
  }
}
