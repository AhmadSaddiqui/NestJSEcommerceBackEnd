// src/products/dto/update-product.dto.ts
import { IsString, IsNumber, IsOptional, IsArray, Min } from 'class-validator';

export class UpdateProductDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsNumber()
  @Min(0, { message: 'Price must be a positive number' })
  @IsOptional()
  price?: number;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber()
  @Min(1, { message: 'Quantity must be at least 1' })
  @IsOptional()
  quantity?: number;

  @IsArray()
  @IsOptional()
  tags?: string[];

  @IsString()
  @IsOptional()
  image?: string; // Base64 encoded image
}
