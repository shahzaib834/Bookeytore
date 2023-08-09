import { PrismaService } from '../prisma.service';
import { Book } from '@prisma/client';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { RentBookDto } from './dto/rent-book.dto';
export declare class BooksService {
    private prisma;
    constructor(prisma: PrismaService);
    getAllBooks(query: {
        filter: string;
    }): Promise<Book[] | null>;
    createBook(createTaskDto: CreateBookDto): Promise<Book | null>;
    getBookById(id: number): Promise<Book | null>;
    deleteBookById(id: number): Promise<Book | null>;
    updateBookById(id: number, updateTaskDto: UpdateBookDto): Promise<Book | null>;
    rentBook(rentBookDto: RentBookDto): Promise<{
        success: boolean;
        message: string;
    } | null>;
    returnRentedBook(id: number): Promise<{
        success: boolean;
        message: string;
    } | null>;
}
