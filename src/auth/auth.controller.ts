import { Controller, Post, Body, Get, Param, BadRequestException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './login.dto';
import { RegisterDto } from './register.dto';
import { SellersService } from 'src/sellers/sellers.service';
import { BuyersService } from 'src/buyers/buyers.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService,
    private readonly sellerService: SellersService,
    private readonly buyerService : BuyersService
  ) {}

  // Registration endpoint
  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    await this.authService.register(registerDto);
    return { message: 'Registration successful. Please check your email for the OTP.' };
  }

  // Login endpoint
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  // Get user by ID
  @Get('users/:id')
  async findById(@Param('id') id: string) {
    return this.authService.findById(id);
  }
  @Get('sellers')
  async findAll(@Param() id: string) {
    return this.sellerService.findAll();
  } @Get('buyers')
  async findAllBuyers(@Param() id: string) {
    return this.buyerService.findAllBuyers();
  }

  // Get user by Email
  @Get('users/email/:email')
  async findByEmail(@Param('email') email: string) {
    return this.authService.findByEmail(email);
  }

  // Endpoint to resend OTP (optional)
/*   @Post('otp/resend')
  async resendOtp(@Body('email') email: string) {
    if (!email) {
      throw new BadRequestException('Email is required');
    }
    await this.authService.sendOtp(email);
    return { message: 'OTP resent successfully' };
  } */

  // OTP verification endpoint
  @Post('otp/verify')
  async verifyOtp(@Body() body: { email: string; otp: string }) {
    const { email, otp } = body;
    if (!email || !otp) {
      throw new BadRequestException('Email and OTP are required');
    }

    // Call the service to verify the OTP and complete registration
    const user = await this.authService.verifyOtp(email, otp);
    return { 
      message: 'OTP verified successfully. You are now registered.', 
      user  // Optionally return the user details if needed
    };
  }
  @Get('users')
  async getAllUsers() {
    return this.authService.getAllUsers();
  }
}
