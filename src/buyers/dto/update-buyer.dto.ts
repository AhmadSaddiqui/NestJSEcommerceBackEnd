import { IsOptional, IsString, IsEmail } from 'class-validator';

export class UpdateBuyerDto {
  @IsOptional()
  @IsString()
  readonly username?: string;

  @IsOptional()
  @IsString()
  readonly password?: string;

  @IsOptional()
  @IsEmail()
  readonly email?: string;
}