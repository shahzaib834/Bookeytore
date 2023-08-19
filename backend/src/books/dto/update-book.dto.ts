import { BookStatus } from '@prisma/client';

export class UpdateBookDto {
  title: string;
  authorName: string;
  rentedQuantity: number;
  stock: number;
  status: BookStatus;
  rentFee: number;
}
