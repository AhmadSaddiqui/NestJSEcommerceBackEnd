import { IsOptional, IsNumber, IsString } from 'class-validator';

export class UpdateCartItemDto {
  @IsOptional()
  @IsString()
  product?: string; // Product ID as a string

  @IsOptional()
  @IsNumber()
  quantity?: number;
}
