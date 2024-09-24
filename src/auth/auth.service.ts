/* // src/auth/auth.service.ts

import { Injectable, BadRequestException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SellersService } from '../sellers/sellers.service';
import { RegisterDto } from './register.dto';
import { LoginDto } from './login.dto';
import { Seller } from '../sellers/schema/sellers.schema';
// import { Buyer } from 'src/buyers/schema/buyers.schema';
// import { User } from 'src/users/schema/users.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly sellersService: SellersService,
    private readonly jwtService: JwtService,
    
  ) {}

  async register(registerDto: RegisterDto): Promise<Seller> {
    const { email, password, role } = registerDto;

    if (!email || !password || !role) {
      throw new BadRequestException('Missing required fields');
    }

    // Check if seller with the same email already exists
    if (role === 'seller') {
      const existingSeller = await this.sellersService.findByEmail(email);
      if (existingSeller) {
        throw new BadRequestException('Email already exists');
      }
    } else {
      throw new BadRequestException('Invalid role for seller registration');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the new seller
    return this.sellersService.create({
      email,
      shopName: 'defaultShop', // Provide default or required values
      password: hashedPassword,
      firstName: 'defaultFirstName',
      lastName: 'defaultLastName',
      address: 'defaultAddress',
      phoneNumber: 'defaultPhoneNumber',
    });
  }

  async login(loginDto: LoginDto): Promise<{ token: string }> {
    console.log('Login method called'); // Basic log to check if this line executes
  
    const { email, password,role } = loginDto;
    console.log('Email:', email);
    console.log('Password:', password);

    // Attempt to find the seller by email
    const seller = await this.sellersService.findByEmail(email);
  
    if (!seller) {
      console.log('Seller not found');
      throw new BadRequestException('Invalid credentials');
    }
  
    // Check password
    const isPasswordValid = await bcrypt.compare(password, seller.password);
    console.log('Password valid:', isPasswordValid);
  
    if (!isPasswordValid) {
      console.log('Invalid password');
      throw new BadRequestException('Invalid credentials');
    }
  
    const payload = { id: seller._id, email: seller.email, role: seller.role };
    const token = this.jwtService.sign(payload);
    console.log('Token generated:', token);
  
    return { token };
  }

  async findById(id: string): Promise<Seller> {
    return this.sellersService.findById(id);
  }

  async findByEmail(email: string): Promise<Seller> {
    return this.sellersService.findByEmail(email);
  }
} */
 
// src/auth/auth.service.ts

/* import { Injectable, BadRequestException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { BuyersService } from '../buyers/buyers.service';
import { RegisterDto } from './register.dto';
import { LoginDto } from './login.dto';
import { BuyerDocument } from 'src/buyers/schema/buyers.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly buyersService: BuyersService,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto): Promise<BuyerDocument> {
    const { email, password, role } = registerDto;

    if (!email || !password || !role) {
      throw new BadRequestException('Missing required fields');
    }

    // Check if buyer with the same email already exists
    if (role === 'buyer') {
      const existingBuyer = await this.buyersService.findByEmail(email);
      if (existingBuyer) {
        throw new BadRequestException('Email already exists');
      }
    } else {
      throw new BadRequestException('Invalid role for buyer registration');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the new buyer
    return this.buyersService.create({
      email,
      password: hashedPassword,
      address:  '',
      phoneNumber:  '',
      firstName: '',
      lastName: '',
      username: 'default', // or any default value if applicable
      
      
    });
  }

  async login(loginDto: LoginDto): Promise<{ token: string }> {
    console.log('Login method called'); // Basic log to check if this line executes
  
    const { email, password, role } = loginDto;
    console.log('Email:', email);
    console.log('Password:', password);

    // Attempt to find the buyer by email
    const buyer = await this.buyersService.findByEmail(email);
  
    if (!buyer) {
      console.log('Buyer not found');
      throw new BadRequestException('Invalid credentials');
    }
  
    // Check password
    const isPasswordValid = await bcrypt.compare(password, buyer.password);
    console.log('Password valid:', isPasswordValid);
  
    if (!isPasswordValid) {
      console.log('Invalid password');
      throw new BadRequestException('Invalid credentials');
    }
  
    const payload = { id: buyer._id, email: buyer.email, role: buyer.role };
    const token = this.jwtService.sign(payload);
    console.log('Token generated:', token);
  
    return { token };
  }

  async findById(id: string): Promise<BuyerDocument> {
    return this.buyersService.findById(id);
  }

  async findByEmail(email: string): Promise<BuyerDocument> {
    return this.buyersService.findByEmail(email);
  }
}
  */
/* import { Injectable, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { BuyersService } from '../buyers/buyers.service';
import { SellersService } from '../sellers/sellers.service';
import { RegisterDto } from './register.dto';
import { LoginDto } from './login.dto'; // Import LoginDto
import { CreateBuyerDto } from '../buyers/dto/create-buyer.dto';
import { CreateSellerDto } from '../sellers/dto/create-seller.dto';
import * as bcrypt from 'bcrypt';
import { BuyerDocument } from 'src/buyers/schema/buyers.schema';

@Injectable()
export class AuthService {
  constructor(
    private readonly buyersService: BuyersService,
    private readonly sellersService: SellersService,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto): Promise<BuyerDocument> {
    const { email, password, role } = registerDto;
  
    if (!email || !password || !role) {
      throw new BadRequestException('Missing required fields');
    }
  
    const existingBuyer = await this.buyersService.findByEmail(email);
    if (existingBuyer) {
      throw new BadRequestException('Email already exists');
    }
  
    const hashedPassword = await bcrypt.hash(password, 10);
    
    return this.buyersService.create({
      email,
      password: hashedPassword,
      address: '',
      phoneNumber: '',
      firstName: '',
      lastName: '',
      username: 'default', // or any default value if applicable
    });
  }

  async login(loginDto: LoginDto): Promise<{ token: string }> {
    console.log('Login DTO:', loginDto);

    const { email, password, role } = loginDto;
  
    let user;
    try {
      if (role === 'buyer') {
        user = await this.buyersService.findByEmail(email);
        
      } else if (role === 'seller') {
        user = await this.sellersService.findByEmail(email);
      } else {
        throw new BadRequestException('Invalid role for login');
      }
  
      if (!user) {
        console.error('User not found for email:', email);
        throw new BadRequestException('Invalid credentials');
      }
  
      console.log('Retrieved user:', user); // Log the retrieved user
      console.log('Password from request:', password);
      console.log('Hashed password from database:', user.password);
      
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        console.error('Invalid password for user:', user.email);
        throw new BadRequestException('Invalid credentials');
      }
  
      const payload = { id: user._id, email: user.email, role: user.role };
      const token = this.jwtService.sign(payload);
      
      return { token };
    } catch (error) {
      console.error('Error during login:', error);
      throw new InternalServerErrorException('Internal server error');
    }
  }

  async findById(id: string): Promise<any> {
    const buyer = await this.buyersService.findById(id);
    if (buyer) return buyer;

    const seller = await this.sellersService.findById(id);
    if (seller) return seller;

    throw new BadRequestException('User not found');
  }

  async findByEmail(email: string): Promise<any> {
    const buyer = await this.buyersService.findByEmail(email);
    if (buyer) return buyer;

    const seller = await this.sellersService.findByEmail(email);
    if (seller) return seller;

    throw new BadRequestException('User not found');
  }
} */
  /*    import { Injectable, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { BuyersService } from '../buyers/buyers.service';
import { SellersService } from '../sellers/sellers.service';
import { UsersService } from '../users/users.service';
import { RegisterDto } from './register.dto';
import { LoginDto } from './login.dto'; 
import { CreateBuyerDto } from '../buyers/dto/create-buyer.dto';
import { CreateSellerDto } from '../sellers/dto/create-seller.dto';
import { CreateUserDto } from '../users/dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { BuyerDocument } from 'src/buyers/schema/buyers.schema';
import { UserDocument } from 'src/users/schema/users.schema';
import { SellerDocument } from 'src/sellers/schema/sellers.schema'; // Import SellerDocument

@Injectable()
export class AuthService {
  constructor(
    private readonly buyersService: BuyersService,
    private readonly sellersService: SellersService,
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto): Promise<BuyerDocument | UserDocument | SellerDocument> {
    const { email, password, role } = registerDto;

    if (!email || !password || !role) {
      throw new BadRequestException('Missing required fields');
    }

    if (role === 'buyer') {
      const existingBuyer = await this.buyersService.findByEmail(email);
      if (existingBuyer) {
        throw new BadRequestException('Email already exists');
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      return this.buyersService.create({
        email,
        password: hashedPassword,
        address: '',
        phoneNumber: '',
        firstName: '',
        lastName: '',
        username: 'default',
      });
    } else if (role === 'seller') {
      const existingSeller = await this.sellersService.findByEmail(email);
      if (existingSeller) {
        throw new BadRequestException('Email already exists');
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      return this.sellersService.create({
        email,
        password: hashedPassword,
        address: '',
        phoneNumber: '',
        firstName: '',
        lastName: '',
        shopName: 'defaultShop',
      });
    } else if (role === 'user') {
      const existingUser = await this.usersService.findByEmail(email);
      if (existingUser) {
        throw new BadRequestException('Email already exists');
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      return this.usersService.create({
        name: 'defaultName',
        username: 'defaultUsername',
        email,
        password: hashedPassword,
        role,
      });
      
    } else {
      throw new BadRequestException('Invalid role for registration');
    }
    
  }

  async login(loginDto: LoginDto): Promise<{ token: string }> {
    console.log('Login DTO:', loginDto);

    const { email, password, role } = loginDto;

    let user;
    try {
      if (role === 'buyer') {
        user = await this.buyersService.findByEmail(email);
      } else if (role === 'seller') {
        user = await this.sellersService.findByEmail(email);
      } else if (role === 'user') {
        user = await this.usersService.findByEmail(email);
      } else {
        throw new BadRequestException('Invalid role for login');
      }

      if (!user) {
        console.error('User not found for email:', email);
        throw new BadRequestException('Invalid credentials');
      }

      console.log('Retrieved user:', user);
      console.log('Password from request:', password);
      console.log('Hashed password from database:', user.password); 
      
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        console.error('Invalid password for user:', user.email);
        throw new BadRequestException('Invalid credentials');
      }

      const payload = { id: user._id, email: user.email, role: user.role };
      const token = this.jwtService.sign(payload);
      
      return { token };
    } catch (error) {
      console.error('Error during login:', error);
      throw new InternalServerErrorException('Internal server error');
    }
  }

  async findById(id: string): Promise<any> {
    const buyer = await this.buyersService.findById(id);
    if (buyer) return buyer;

    const seller = await this.sellersService.findById(id);
    if (seller) return seller;

    const user = await this.usersService.findById(id);
    if (user) return user;

    throw new BadRequestException('User not found');
  }

  async findByEmail(email: string): Promise<any> {
    const buyer = await this.buyersService.findByEmail(email);
    if (buyer) return buyer;

    const seller = await this.sellersService.findByEmail(email);
    if (seller) return seller;

    const user = await this.usersService.findByEmail(email);
    if (user) return user;

    throw new BadRequestException('User not found');
  }
}  */
//====================================================
 /*  import {
    Injectable,
    BadRequestException,
    InternalServerErrorException,
  } from '@nestjs/common';
  import { JwtService } from '@nestjs/jwt';
  import { BuyersService } from '../buyers/buyers.service';
  import { SellersService } from '../sellers/sellers.service';
  import { UsersService } from '../users/users.service';
  import { OtpService } from '../otp/otp.service'; // Import OTP Service
  import { RegisterDto } from './register.dto';
  import { LoginDto } from './login.dto';
  import * as bcrypt from 'bcrypt';
  import { EmailService } from './email.service';
  import { BuyerDocument } from 'src/buyers/schema/buyers.schema';
  import { UserDocument } from 'src/users/schema/users.schema';
  import { Seller, SellerDocument } from 'src/sellers/schema/sellers.schema';
  
  @Injectable()
  export class AuthService {
    private pendingRegistrations = new Map<string, { registerDto: RegisterDto; otp: string }>(); // Store pending registrations with OTP
  
    constructor(
      private readonly buyersService: BuyersService,
      private readonly sellersService: SellersService,
      private readonly usersService: UsersService,
      private readonly jwtService: JwtService,
      private readonly emailService: EmailService,
      private readonly otpService: OtpService, // Inject OTP Service
      
    ) {}
  
   
    async register(registerDto: RegisterDto): Promise<void> {
      const { email, role } = registerDto;
  
      if (!email || !role) {
        throw new BadRequestException('Missing required fields');
      }
  
      // Check if email is already registered
      await this.checkEmailExists(email, role);
  
      // Normalize email
      const normalizedEmail = email.trim().toLowerCase();
  
      // Generate OTP and store it along with registration data
      const otp = this.generateOtp(); // Generate 6-digit OTP
      this.pendingRegistrations.set(normalizedEmail, { registerDto, otp });
      console.log(`Added to pending registrations:`, normalizedEmail, { registerDto, otp });
      // Store OTP in the database for persistence
      await this.otpService.createOtp(normalizedEmail, otp);
      console.log(`Created OTP for ${normalizedEmail}:`, otp); // Log created OTP
  
      // Send OTP via Email Service
      await this.emailService.sendVerificationEmail(normalizedEmail, otp);
      console.log(`Created OTP for ${normalizedEmail}:`, otp); // Log created OTP
    }
  
    // Check if the email already exists based on role
    private async checkEmailExists(email: string, role: string): Promise<void> {
      if (role === 'buyer') {
        const existingBuyer = await this.buyersService.findByEmail(email);
        if (existingBuyer) throw new BadRequestException('Email already exists');
      } else if (role === 'seller') {
        const existingSeller = await this.sellersService.findByEmail(email);
        if (existingSeller) throw new BadRequestException('Email already exists');
      } else if (role === 'user') {
        const existingUser = await this.usersService.findByEmail(email);
        if (existingUser) throw new BadRequestException('Email already exists');
      } else {
        throw new BadRequestException('Invalid role for registration');
      }
    }
  
    // Generate a random 6-digit OTP
    private generateOtp(): string {
      return Math.floor(100000 + Math.random() * 900000).toString();
    }
  
    // Verify OTP and complete registration
    async verifyOtp(email: string, otp: string): Promise<Seller> {
      const normalizedEmail = email.trim().toLowerCase(); // Normalize email
      console.log('Pending registrations:', Array.from(this.pendingRegistrations.keys()));
    console.log("===========")
      // Validate OTP from the database
      const pendingRegistrationData = this.pendingRegistrations.get(normalizedEmail);
  if (!pendingRegistrationData) {
    throw new BadRequestException('No pending registration found');
  }
      const storedOtp = await this.otpService.findOtpByEmail(normalizedEmail);
      if (!storedOtp || storedOtp.otp !== otp) {
        throw new BadRequestException('Invalid OTP');
      }
    
      // Check if the OTP has expired (5 minutes)
      const isExpired = Date.now() - storedOtp.createdAt.getTime() > 5 * 60 * 1000;
      if (isExpired) {
        await this.otpService.deleteOtp(normalizedEmail); // Remove expired OTP
        throw new BadRequestException('OTP has expired');
      }
    
      // Retrieve pending registration data
      const pendingRegistration = this.pendingRegistrations.get(normalizedEmail);
      if (!pendingRegistration) {
        throw new BadRequestException('No pending registration found');
      }
    
      // Proceed with user registration based on role
      const user = await this.registerUser(pendingRegistration.registerDto, normalizedEmail);
    
      // Clean up after registration
      await this.otpService.deleteOtp(normalizedEmail); // Remove OTP after successful registration
      this.pendingRegistrations.delete(normalizedEmail); // Remove from pending registrations
    
      return user; // Return the newly created user (Seller)
    }
  
    // Helper method to register user based on role
    private async registerUser(registerDto: RegisterDto, email: string): Promise<any> {
      const { password, role } = registerDto;
      const hashedPassword = await bcrypt.hash(password, 10);
  
      if (role === 'buyer') {
        return this.buyersService.create({
          email,
          password: hashedPassword,
          address: '',
          phoneNumber: '',
          firstName: '',
          lastName: '',
          username: 'default',
        });
      } else if (role === 'seller') {
        return this.sellersService.create({
          email,
          password: hashedPassword,
          address: '',
          phoneNumber: '',
          firstName: '',
          lastName: '',
          shopName: 'defaultShop',
        });
      } else if (role === 'user') {
        return this.usersService.create({
          name: 'defaultName',
          username: 'defaultUsername',
          email,
          password: hashedPassword,
          role,
        });
      } else {
        throw new BadRequestException('Invalid role for registration');
      }
    }
    // Login logic
    async login(loginDto: LoginDto): Promise<{ token: string }> {
      const { email, password, role } = loginDto;
      let user;
  
      try {
        if (role === 'buyer') {
          user = await this.buyersService.findByEmail(email);
        } else if (role === 'seller') {
          user = await this.sellersService.findByEmail(email);
        } else if (role === 'user') {
          user = await this.usersService.findByEmail(email);
        } else {
          throw new BadRequestException('Invalid role for login');
        }
  
        if (!user) {
          throw new BadRequestException('Invalid credentials');
        }
  
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
          throw new BadRequestException('Invalid credentials');
        }
  
        const payload = { id: user._id, email: user.email, role: user.role };
        const token = this.jwtService.sign(payload);
  
        return { token };
      } catch (error) {
        throw new InternalServerErrorException('Internal server error');
      }
    }
  
    // Utility to find user by ID
    async findById(id: string): Promise<any> {
      const buyer = await this.buyersService.findById(id);
      if (buyer) return buyer;
  
      const seller = await this.sellersService.findById(id);
      if (seller) return seller;
  
      const user = await this.usersService.findById(id);
      if (user) return user;
  
      throw new BadRequestException('User not found');
    }
  
    // Utility to find user by Email
    async findByEmail(email: string): Promise<any> {
      const buyer = await this.buyersService.findByEmail(email);
      if (buyer) return buyer;
  
      const seller = await this.sellersService.findByEmail(email);
      if (seller) return seller;
  
      const user = await this.usersService.findByEmail(email);
      if (user) return user;
  
      throw new BadRequestException('User not found');
    }
  }
  */  
 //================================================
  // Registration logic
    /* async register(registerDto: RegisterDto): Promise<void> {
      const { email, role } = registerDto;
  
      if (!email || !role) {
        throw new BadRequestException('Missing required fields');
      }
  
      // Check if email is already registered
      await this.checkEmailExists(email, role);
  
      // Normalize email
      const normalizedEmail = email.trim().toLowerCase();
  
      // Generate OTP and store it along with registration data
      const otp = this.generateOtp(); // Generate 6-digit OTP
      this.pendingRegistrations.set(normalizedEmail, { registerDto, otp });
  
      // Store OTP in the database for persistence (optional)
      await this.otpService.createOtp(normalizedEmail, otp);
      console.log(`Created OTP for ${normalizedEmail}:`, otp); // Log created OTP
  
      // Send OTP via Email Service
      await this.emailService.sendVerificationEmail(normalizedEmail, otp);
    }
  
    // Check if the email already exists based on role
    private async checkEmailExists(email: string, role: string): Promise<void> {
      if (role === 'buyer') {
        const existingBuyer = await this.buyersService.findByEmail(email);
        if (existingBuyer) throw new BadRequestException('Email already exists');
      } else if (role === 'seller') {
        const existingSeller = await this.sellersService.findByEmail(email);
        if (existingSeller) throw new BadRequestException('Email already exists');
      } else if (role === 'user') {
        const existingUser = await this.usersService.findByEmail(email);
        if (existingUser) throw new BadRequestException('Email already exists');
      } else {
        throw new BadRequestException('Invalid role for registration');
      }
    }
  
    // Generate a random 6-digit OTP
    private generateOtp(): string {
      return Math.floor(100000 + Math.random() * 900000).toString();
    }
  
    // Verify OTP and complete registration
    async verifyOtp(email: string, otp: string): Promise<SellerDocument | BuyerDocument | UserDocument> {
      const normalizedEmail = email.trim().toLowerCase(); // Normalize email
  
      // Log current pending registrations
      console.log('Current pending registrations:', Array.from(this.pendingRegistrations.entries()));
  
      // Retrieve pending registration data
      const pendingRegistration = this.pendingRegistrations.get(normalizedEmail);
      if (!pendingRegistration) {
        throw new BadRequestException('No pending registration found');
      }
  
      // Validate the OTP
      if (pendingRegistration.otp !== otp) {
        throw new BadRequestException('Invalid OTP');
      }
  
      // Check if the OTP has expired (5 minutes)
      const isExpired = Date.now() - (await this.otpService.findOtpByEmail(normalizedEmail)).createdAt.getTime() > 5 * 60 * 1000;
      if (isExpired) {
        await this.otpService.deleteOtp(normalizedEmail); // Remove expired OTP
        throw new BadRequestException('OTP has expired');
      }
  
      // Proceed with user registration
      const user = await this.registerUser(pendingRegistration.registerDto, normalizedEmail);
  
      // Clean up after registration
      await this.otpService.deleteOtp(normalizedEmail); // Remove OTP after successful registration
      this.pendingRegistrations.delete(normalizedEmail); // Remove from pending registrations
  
      return user;
    }
  
    // Helper method to register user based on role
    private async registerUser(registerDto: RegisterDto, email: string): Promise<SellerDocument | BuyerDocument | UserDocument> {
      const { password, role } = registerDto;
      const hashedPassword = await bcrypt.hash(password, 10);
  
      if (role === 'buyer') {
        return this.buyersService.create({
          email,
          password: hashedPassword,
          address: '',
          phoneNumber: '',
          firstName: '',
          lastName: '',
          username: 'default',
        });
      } else if (role === 'seller') {
        return this.sellersService.create({
          email,
          password: hashedPassword,
          address: '',
          phoneNumber: '',
          firstName: '',
          lastName: '',
          shopName: 'defaultShop',
        });
      } else if (role === 'user') {
        return this.usersService.create({
          name: 'defaultName',
          username: 'defaultUsername',
          email,
          password: hashedPassword,
          role,
        });
      } else {
        throw new BadRequestException('Invalid role for registration');
      }
    }
   */
    import {
      Injectable,
      BadRequestException,
      InternalServerErrorException,
    } from '@nestjs/common';
    import { JwtService } from '@nestjs/jwt';
    import { BuyersService } from '../buyers/buyers.service';
    import { SellersService } from '../sellers/sellers.service';
    import { UsersService } from '../users/users.service';
    import { OtpService } from '../otp/otp.service';
    import { RegisterDto } from './register.dto';
    import { LoginDto } from './login.dto';
    import * as bcrypt from 'bcrypt';
    import { EmailService } from './email.service';
    import { PendingRegistrationService } from '../pending-registration/pending-registration.service';
    import { SelfRegisterSellerDto } from 'src/sellers/dto/SelfRegisterSellerDto';
    
    @Injectable()
    export class AuthService {
      constructor(
        private readonly buyersService: BuyersService,
        private readonly sellersService: SellersService,
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
        private readonly emailService: EmailService,
        private readonly otpService: OtpService,
        private readonly pendingRegistrationService: PendingRegistrationService
      ) {}
    
      // Registration method
      async register(
        registerDto: RegisterDto | SelfRegisterSellerDto
      ): Promise<void> {
        const { email } = registerDto;
    
        if (!email) {
          throw new BadRequestException('Missing required fields');
        }
    
        // Normalize email
        const normalizedEmail = email.trim().toLowerCase();
    
        // Check if email already exists
        await this.checkEmailExists(normalizedEmail, registerDto.role);
    
        // Generate OTP
        const otp = this.generateOtp();
    
        // Store registration details in PendingRegistrationService
        this.pendingRegistrationService.addPendingRegistration(
          normalizedEmail,
          registerDto
        );
        console.log(`Pending registration added for ${normalizedEmail}`);
    
        // Store OTP in the database
        await this.otpService.createOtp(normalizedEmail, otp);
        console.log(`OTP created for ${normalizedEmail}:`, otp);
    
        // Send OTP via Email
        await this.emailService.sendVerificationEmail(normalizedEmail, otp);
        console.log(`OTP sent to ${normalizedEmail}`);
      }
    
      // Verify OTP and complete registration
      async verifyOtp(email: string, otp: string): Promise<any> {
        const normalizedEmail = email.trim().toLowerCase();
        console.log('Pending registrations:', this.pendingRegistrationService.getAllPendingRegistrations());
    
        // Retrieve pending registration details
        const pendingRegistration = this.pendingRegistrationService.getPendingRegistration(normalizedEmail);
        if (!pendingRegistration) {
          throw new BadRequestException('No pending registration found');
        }
    
        // Validate OTP from the database
        const storedOtp = await this.otpService.findOtpByEmail(normalizedEmail);
        if (!storedOtp || storedOtp.otp !== otp) {
          throw new BadRequestException('Invalid OTP');
        }
    
        // Check if OTP has expired (5 minutes)
        const isExpired = Date.now() - storedOtp.createdAt.getTime() > 5 * 60 * 1000;
        if (isExpired) {
          await this.otpService.deleteOtp(normalizedEmail); // Remove expired OTP
          throw new BadRequestException('OTP has expired');
        }
    
        // Proceed with user registration based on DTO type
        const user = await this.registerUser(pendingRegistration, normalizedEmail);
    
        // Clean up after registration
        await this.otpService.deleteOtp(normalizedEmail); // Remove OTP after successful registration
        this.pendingRegistrationService.removePendingRegistration(normalizedEmail); // Remove pending registration
    
        return user;
      }
    
      // Helper method to register user based on role
      private async registerUser(
        registerDto: RegisterDto | SelfRegisterSellerDto,
        email: string
      ): Promise<any> {
        const hashedPassword = await bcrypt.hash(registerDto.password, 10);
        
        if (this.isRegisterDto(registerDto)) {
          // Handle buyer/user registration using RegisterDto
          const { role } = registerDto;
    
          if (role === 'buyer') {
            return this.buyersService.create({
              email,
              password: hashedPassword,
              address: '',
              phoneNumber: '',
              firstName: '',
              lastName: '',
              username: 'default',
            });
          } else if (role === 'user') {
            return this.usersService.create({
              name: registerDto.name,
              username: registerDto.username,
              email,
              password: hashedPassword,
              role,
            });
          }
        } else {
          // Handle seller registration using SelfRegisterSellerDto
          const role = registerDto.role; // Get role from DTO
          
          if (role !== 'seller') {
            throw new BadRequestException('Invalid role for registration'); // This will catch invalid roles
          }
    
          // Create the seller in the database
          const seller = await this.sellersService.selfRegister({
            email,
            password: hashedPassword,
            address: registerDto.address,
            phoneNumber: registerDto.phoneNumber,
            firstName: registerDto.firstName,
            lastName: registerDto.lastName,
            shopName: registerDto.shopName,
            role, // Ensure role is included
          });
          console.log('Seller registered:', seller);
          return seller;
        }
      }
    
      // Utility function to check if the DTO is RegisterDto
      private isRegisterDto(dto: any): dto is RegisterDto {
        return (dto as RegisterDto).role !== undefined;
      }
    
      // Utility to check if email already exists
      private async checkEmailExists(email: string, role: string): Promise<void> {
        if (role === 'buyer') {
          const existingBuyer = await this.buyersService.findByEmail(email);
          if (existingBuyer) throw new BadRequestException('Email already exists');
        } else if (role === 'seller') {
          const existingSeller = await this.sellersService.findByEmail(email);
          if (existingSeller) throw new BadRequestException('Email already exists');
        } else if (role === 'user') {
          const existingUser = await this.usersService.findByEmail(email);
          if (existingUser) throw new BadRequestException('Email already exists');
        } else {
          throw new BadRequestException('Invalid role for registration');
        }
      }
    
      // Generate a random 6-digit OTP
      private generateOtp(): string {
        return Math.floor(100000 + Math.random() * 900000).toString();
      }
    
      // Login logic
      async login(loginDto: LoginDto): Promise<{ token: string }> {
        const { email, password, role } = loginDto;
        let user;
    
        try {
          if (role === 'buyer') {
            user = await this.buyersService.findByEmail(email);
          } else if (role === 'seller') {
            user = await this.sellersService.findByEmail(email);
          } else if (role === 'user') {
            user = await this.usersService.findByEmail(email);
          } else {
            throw new BadRequestException('Invalid role for login');
          }
    
          if (!user) {
            throw new BadRequestException('Invalid credentials');
          }
    
          const isPasswordValid = await bcrypt.compare(password, user.password);
          if (!isPasswordValid) {
            throw new BadRequestException('Invalid credentials');
          }
    
          const payload = { id: user._id, email: user.email, role: user.role };
          const token = this.jwtService.sign(payload);
    
          return { token };
        } catch (error) {
          throw new InternalServerErrorException('Internal server error');
        }
      }
    
      // Utility to find user by ID
      async findById(id: string): Promise<any> {
        const buyer = await this.buyersService.findById(id);
        if (buyer) return buyer;
    
        const seller = await this.sellersService.findById(id);
        if (seller) return seller;
    
        const user = await this.usersService.findById(id);
        if (user) return user;
    
        throw new BadRequestException('User not found');
      }
    
      // Utility to find user by Email
      async findByEmail(email: string): Promise<any> {
        const buyer = await this.buyersService.findByEmail(email);
        if (buyer) return buyer;
    
        const seller = await this.sellersService.findByEmail(email);
        if (seller) return seller;
    
        const user = await this.usersService.findByEmail(email);
        if (user) return user;
    
        throw new BadRequestException('User not found');
      }
    }
    