import { IsNotEmpty } from 'class-validator';

export class RentBookDto {
  @IsNotEmpty()
  bookId: number;

  @IsNotEmpty()
  memberId: number;
}
