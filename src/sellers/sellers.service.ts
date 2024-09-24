// src/sellers/sellers.service.ts

/* import { Injectable, NotFoundException, ConflictException, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Seller } from './schema/sellers.schema';
import { CreateSellerDto } from './dto/create-seller.dto';
import { UpdateSellerDto } from './dto/update-seller.dto';
import { SelfRegisterSellerDto } from './dto/SelfRegisterSellerDto';
import * as bcrypt from 'bcrypt';
import { EmailService } from 'src/auth/email.service';
import { OtpService } from 'src/otp/otp.service';

@Injectable()
export class SellersService {
  private pendingRegistrations: Map<string, SelfRegisterSellerDto> = new Map();
  constructor(
    @InjectModel('Seller.name') private sellerModel: Model<Seller>, // Remove quotes around Seller.name
    //private pendingRegistrations = new Map<string, SelfRegisterSellerDto>(),
    private readonly emailService: EmailService,
    private readonly otpService: OtpService,
  ) {}

   async create(createSellerDto: CreateSellerDto): Promise<Seller> {
    const newSeller = new this.sellerModel(createSellerDto);
    return newSeller.save();
  }


  
  async selfRegister(selfRegisterSellerDto: SelfRegisterSellerDto): Promise<void> {
    const { email, shopName, password, firstName, lastName, address, phoneNumber } = selfRegisterSellerDto;
    console.log('selfRegister method called with:', selfRegisterSellerDto);
    
    // Check if a seller with the same email or shop name already exists
    const existingSellerByEmail = await this.sellerModel.findOne({ email }).exec();
    if (existingSellerByEmail) {
      throw new ConflictException('Seller with this email already exists');
    }

    const existingSellerByShopName = await this.sellerModel.findOne({ shopName }).exec();
    if (existingSellerByShopName) {
      throw new ConflictException('Seller with this shop name already exists');
    }

    // Temporarily store registration details
    this.pendingRegistrations.set(email, selfRegisterSellerDto);
    console.log('Pending Registrations after adding:', Array.from(this.pendingRegistrations.keys()));

    // Generate OTP and store it in the database
    const otp = this.generateOtp();
    console.log('Generated OTP:', otp); // Log generated OTP
    await this.otpService.createOtp(email, otp); // Store OTP in the database

    // Send OTP via email
    await this.emailService.sendVerificationEmail(email, otp);
    console.log('OTP sent to:', email); // Log successful email send
  }

  // Method for OTP verification
   async verifyOtp(email: string, otp: string): Promise<Seller> {
    // Check if there's a pending registration for the given email
    console.log(email,otp)
    const pendingRegistration = this.pendingRegistrations.get(email);
    if (!pendingRegistration) {
      throw new ConflictException('No pending registration found for this email');
    }

    // Validate the OTP from the database
    const otpRecord = await this.otpService.findOtpByEmail(email); // Find OTP record for the email
    if (!otpRecord || otpRecord.otp !== otp) {
      throw new ConflictException('Invalid OTP');
    }

    // Check if OTP has expired (assuming OTP has a createdAt timestamp and expires after 5 minutes)
    const otpAge = Date.now() - otpRecord.createdAt.getTime();
    if (otpAge > 5 * 60 * 1000) {
      await this.otpService.deleteOtp(email); // Remove expired OTP
      throw new ConflictException('OTP has expired');
    }

    // Hash the password before saving the seller
    const hashedPassword = await bcrypt.hash(pendingRegistration.password, 10);

    // Create and save the new seller
    const newSeller = new this.sellerModel({
      email,
      shopName: pendingRegistration.shopName,
      password: hashedPassword,
      firstName: pendingRegistration.firstName,
      lastName: pendingRegistration.lastName,
      address: pendingRegistration.address,
      phoneNumber: pendingRegistration.phoneNumber,
    });

    try {
      const savedSeller = await newSeller.save();

      // Cleanup: Remove the OTP record and pending registration after successful save
      await this.otpService.deleteOtp(email); // Remove OTP after successful registration
      this.pendingRegistrations.delete(email); // Remove from pending registrations

      return savedSeller;
    } catch (error) {
      console.error('Error saving seller:', error);
      throw new InternalServerErrorException('Error registering seller');
    }
  } 

  // Simple OTP generation logic (6-digit number)
  private generateOtp(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
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
 *//* async selfRegister(selfRegisterSellerDto: SelfRegisterSellerDto): Promise<Seller> {
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
  }   */

    
/* async selfRegister(selfRegisterSellerDto: SelfRegisterSellerDto): Promise<Seller> {
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

    try {
      const savedSeller = await newSeller.save();

      // Generate OTP and send email
      const otp = this.generateOtp(); // You can keep this method or call otpService.createOtp
      await this.otpService.createOtp(email, otp); // Store OTP in the database
      await this.emailService.sendVerificationEmail(email, otp); // Send OTP via email

      return savedSeller; // Return the saved seller, possibly change this to indicate OTP sent
    } catch (error) {
      console.error('Error saving seller:', error);
      throw new InternalServerErrorException('Error registering seller');
    }
  }

  private generateOtp(): string {
    // Simple OTP generation logic (6-digit number)
    return Math.floor(100000 + Math.random() * 900000).toString();
  }
   */  
  import { Injectable, NotFoundException, ConflictException, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Seller } from './schema/sellers.schema';
import { CreateSellerDto } from './dto/create-seller.dto';
import { UpdateSellerDto } from './dto/update-seller.dto';
import { SelfRegisterSellerDto } from './dto/SelfRegisterSellerDto';
import * as bcrypt from 'bcrypt';
import { EmailService } from 'src/auth/email.service';
import { OtpService } from 'src/otp/otp.service';
import { PendingRegistrationService } from 'src/pending-registration/pending-registration.service'; // Import PendingRegistrationService

@Injectable()
export class SellersService {
  constructor(
    @InjectModel('Seller') private sellerModel: Model<Seller>, // Correctly referencing Seller
    private readonly emailService: EmailService,
    private readonly otpService: OtpService,
    private readonly pendingRegistrationService: PendingRegistrationService, // Inject PendingRegistrationService
  ) {}

  async create(createSellerDto: CreateSellerDto): Promise<Seller> {
    const newSeller = new this.sellerModel(createSellerDto);
    return newSeller.save();
  }

  async selfRegister(selfRegisterSellerDto: SelfRegisterSellerDto): Promise<void> {
    const { email, shopName } = selfRegisterSellerDto;

    // Check if a seller with the same email or shop name already exists
    const existingSellerByEmail = await this.sellerModel.findOne({ email }).exec();
    if (existingSellerByEmail) {
        throw new ConflictException('Seller with this email already exists');
    }

    const existingSellerByShopName = await this.sellerModel.findOne({ shopName }).exec();
    if (existingSellerByShopName) {
        throw new ConflictException('Seller with this shop name already exists');
    }

    // Store registration details using PendingRegistrationService
    this.pendingRegistrationService.addPendingRegistration(email, selfRegisterSellerDto);
    console.log('Pending Registrations after adding:', this.pendingRegistrationService.getAllPendingRegistrations());

    // Generate OTP and store it in the database
    const otp = this.generateOtp();
    console.log('Generated OTP:', otp);
    await this.otpService.createOtp(email, otp);

    // Send OTP via email
    await this.emailService.sendVerificationEmail(email, otp);
    console.log('OTP sent to:', email);
}

  
  // Simple OTP generation logic (6-digit number)
  private generateOtp(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
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
/* async verifyOtp(email: string, otp: string): Promise<Seller> {
    console.log(email, otp);

    // Retrieve pending registration from PendingRegistrationService
    const pendingRegistration = this.pendingRegistrationService.getPendingRegistration(email);
    if (!pendingRegistration) {
      throw new ConflictException('No pending registration found for this email');
    }

    // Validate the OTP from the database
    const otpRecord = await this.otpService.findOtpByEmail(email);
    if (!otpRecord || otpRecord.otp !== otp) {
      throw new ConflictException('Invalid OTP');
    }

    // Check if OTP has expired (5-minute expiration)
    const otpAge = Date.now() - otpRecord.createdAt.getTime();
    if (otpAge > 5 * 60 * 1000) {
      await this.otpService.deleteOtp(email);
      throw new ConflictException('OTP has expired');
    }

    // Hash the password before saving the seller
    const hashedPassword = await bcrypt.hash(pendingRegistration.password, 10);

    // Create and save the new seller
    const newSeller = new this.sellerModel({
      email,
      shopName: pendingRegistration.shopName,
      password: hashedPassword,
      firstName: pendingRegistration.firstName,
      lastName: pendingRegistration.lastName,
      address: pendingRegistration.address,
      phoneNumber: pendingRegistration.phoneNumber,
    });

    try {
      const savedSeller = await newSeller.save();

      // Cleanup after successful save
      await this.otpService.deleteOtp(email);
      this.pendingRegistrationService.removePendingRegistration(email);

      return savedSeller;
    } catch (error) {
      console.error('Error saving seller:', error);
      throw new InternalServerErrorException('Error registering seller');
    }
  }
 */