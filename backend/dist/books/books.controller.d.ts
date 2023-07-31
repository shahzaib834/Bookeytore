import { BooksService } from './books.service';
import { Book } from '@prisma/client';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
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
    }, unknown> & {}>;
}
