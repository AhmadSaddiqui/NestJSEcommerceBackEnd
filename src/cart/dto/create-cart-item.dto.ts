import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreateCartDto {
  @IsNotEmpty()
  @IsString()
  product: string; 

  @IsNotEmpty()
  @IsNumber()
  quantity: number;
}
