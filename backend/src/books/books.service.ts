import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Book } from '@prisma/client';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Injectable()
export class BooksService {
  constructor(private prisma: PrismaService) {}

  getAllBooks(query: { filter: string }): Promise<Book[] | null> {
    if (Object.keys(query).length === 0) return this.prisma.book.findMany();

    return this.prisma.book.findMany({
      where: {
        OR: [
          { title: { contains: query.filter } },
          { description: { contains: query.filter } },
        ],
      },
    });
  }

  createBook(createTaskDto: CreateBookDto): Promise<Book | null> {
    const { title, description } = createTaskDto;

    return this.prisma.book.create({
      data: {
        title,
        description,
      },
    });
  }

  async getBookById(id: number): Promise<Book | null> {
    const book = await this.prisma.book.findUnique({
      where: {
        id,
      },
    });

    if (!book) {
      throw new NotFoundException(`Task with id: ${id} not found`);
    }
    return book;
  }

  async deleteBookById(id: number): Promise<Book | null> {
    await this.getBookById(id);

    const deletedBook = await this.prisma.book.delete({
      where: {
        id,
      },
    });
    return deletedBook;
  }

  async updateBookById(
    id: number,
    updateTaskDto: UpdateBookDto
  ): Promise<Book | null> {
    const { title, description } = updateTaskDto;

    return await this.prisma.book.update({
      where: { id },
      data: { title, description },
    });
  }
}
