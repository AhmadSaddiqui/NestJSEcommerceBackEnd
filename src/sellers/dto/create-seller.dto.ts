import { IsString, IsEmail, MinLength } from 'class-validator';

export class CreateSellerDto {
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
  phoneNumber: string;
}
