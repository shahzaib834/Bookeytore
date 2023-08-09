import { BooksService } from './books.service';
import { Book } from '@prisma/client';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { RentBookDto } from './dto/rent-book.dto';
export declare class BooksController {
    private booksService;
    constructor(booksService: BooksService);
    getAllBooks(query: {
        filter: string;
    }): Promise<Book[] | null>;
    createTask(createBookDto: CreateBookDto): Promise<Book | null>;
    getBookById(id: number): Promise<Book | null>;
    updateBookById(id: number, updateBookDto: UpdateBookDto): Promise<Book | null>;
    deleteBookById(id: number): Promise<import("@prisma/client/runtime/library").GetResult<{
        id: number;
        title: string;
        description: string;
        status: import(".prisma/client").BookStatus;
        rentFee: number;
        createdAt: Date;
        updatedAt: Date;
    }, unknown> & {}>;
    rentABook(rentBookDto: RentBookDto): Promise<{
        success: boolean;
        message: string;
    } | null>;
    returnRentedBook(id: number): Promise<{
        success: boolean;
        message: string;
    }>;
}
