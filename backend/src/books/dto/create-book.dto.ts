import { IsNotEmpty, MaxLength } from 'class-validator';

export class CreateBookDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  @MaxLength(300)
  description: string;

  @IsNotEmpty()
  rentFee: number;

  @IsNotEmpty()
  authorName: string;
}
