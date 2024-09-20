import { IsNotEmpty, IsMongoId } from 'class-validator';

export class CheckoutCartDto {
  @IsNotEmpty()
  @IsMongoId()
  userId: string;
}
