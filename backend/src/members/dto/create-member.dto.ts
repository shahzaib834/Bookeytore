import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateMemberDto {
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;
}