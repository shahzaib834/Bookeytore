import { IsNotEmpty, IsDate } from 'class-validator';

export class AddCommentDto {
  @IsNotEmpty()
  comment: string;

  @IsNotEmpty()
  username: string;
}
