import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreateCartDto {
  @IsNotEmpty()
  @IsString()
  product: string; // This should be the product ID as a string

  @IsNotEmpty()
  @IsNumber()
  quantity: number;
}
