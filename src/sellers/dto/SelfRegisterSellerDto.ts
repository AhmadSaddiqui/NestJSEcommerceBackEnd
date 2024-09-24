// src/sellers/dto/self-register-seller.dto.ts
import { IsString, IsEmail, MinLength } from 'class-validator';

export class SelfRegisterSellerDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  shopName: string;

  @IsString()
  address: string;

  @IsString()
  phoneNumber: string;readonly role: string = 'seller'; // Optional: default role for sellers

}
