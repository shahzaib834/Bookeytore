import { IsNotEmpty, MaxLength } from 'class-validator';

export class CreateBookDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  rentFee: number;

  @IsNotEmpty()
  authorName: string;

  rentedQuantity: number;
  stock: number;

  image_public_id: string;
  image_url: string;
}
