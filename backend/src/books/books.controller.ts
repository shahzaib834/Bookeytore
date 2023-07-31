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
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { Book } from '@prisma/client';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('books')
export class BooksController {
  constructor(private booksService: BooksService) {}

  @UseGuards(AuthGuard)
  @Get()
  getAllBooks(@Query() query: { filter: string }): Promise<Book[] | null> {
    return this.booksService.getAllBooks(query);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createTask(@Body() createBookDto: CreateBookDto): Promise<Book | null> {
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
}
