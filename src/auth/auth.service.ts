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
  import { Injectable, BadRequestException, InternalServerErrorException } from '@nestjs/common';
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
}
