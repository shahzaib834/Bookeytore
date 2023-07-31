import { IsNotEmpty } from 'class-validator';

export class CreateBookDto {
    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    description: string;
}