import { IsOptional, IsNumber, IsString } from 'class-validator';

export class UpdateOrderDto {
  @IsOptional()
  @IsString()
  readonly productId?: string;

  @IsOptional()
  @IsNumber()
  readonly amount?: number;

  @IsOptional()
  @IsString()
  readonly status?: 'pending' | 'completed' | 'cancelled';
}