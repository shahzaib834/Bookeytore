import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { Book } from '@prisma/client';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { RentBookDto } from './dto/rent-book.dto';
import { AddCommentDto } from './dto/add-comment.dto';

@Controller('books')
@UseGuards(AuthGuard)
export class BooksController {
  constructor(private booksService: BooksService) {}

  @Get()
  getAllBooks(
    @Query() query: { filter: string; page: number; limit: number }
  ): Promise<Book[] | null> {
    return this.booksService.getAllBooks(query);
  }

  @Post()
  createBook(
    @Body(ValidationPipe) createBookDto: CreateBookDto
  ): Promise<Book | null> {
    return this.booksService.createBook(createBookDto);
  }

  @Get('/:id')
  getBookById(@Param('id', ParseIntPipe) id: number): Promise<Book | null> {
    return this.booksService.getBookById(id);
  }

  @Put('/:id')
  updateBookById(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) updateBookDto: UpdateBookDto
  ): Promise<Book | null> {
    return this.booksService.updateBookById(id, updateBookDto);
  }

  @Delete('/:id')
  deleteBookById(@Param('id', ParseIntPipe) id: number) {
    return this.booksService.deleteBookById(id);
  }

  @Post('/rent/add')
  rentABook(
    @Body(ValidationPipe) rentBookDto: RentBookDto
  ): Promise<{ success: boolean; message: string } | null> {
    return this.booksService.rentBook(rentBookDto);
  }

  @Post('/:id/comment')
  addComment(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) addCommentDto: AddCommentDto
  ): Promise<{ success: boolean; message: string } | null> {
    return this.booksService.addComment(id, addCommentDto);
  }

  @Post('/return-book/:bookId/member/:memberId')
  returnRentedBook(
    @Param('bookId', ParseIntPipe) bookId: number,
    @Param('memberId', ParseIntPipe) memberId: number
  ): Promise<{ success: boolean; message: string }> {
    return this.booksService.returnRentedBook(bookId, memberId);
  }
}
