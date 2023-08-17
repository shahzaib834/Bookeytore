import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Book, Member, Prisma } from '@prisma/client';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { RentBookDto } from './dto/rent-book.dto';
import { AddCommentDto } from './dto/add-comment.dto';

@Injectable()
export class BooksService {
  constructor(private prisma: PrismaService) {}

  getAllBooks(query: {
    filter: string;
    page: number;
    limit: number;
  }): Promise<Book[] | null> {
    if (!query.page) query.page = 1;
    if (!query.limit) query.limit = 10;
    const skip = query.page * query.limit - query.limit;

    if (!query.filter) {
      return this.prisma.book.findMany({
        skip,
        take: query.limit,
        orderBy: {
          createdAt: 'desc',
        },
        include: {
          comments: {
            select: {
              id: true,
              bookId: true,
              comment: true,
            },
          },
        },
      });
    } else {
      return this.prisma.book.findMany({
        skip,
        take: query.limit,
        orderBy: {
          createdAt: 'desc',
        },
        where: {
          OR: [
            { title: { contains: query.filter } },
            { description: { contains: query.filter } },
          ],
        },
        include: {
          comments: {
            select: {
              id: true,
              bookId: true,
              comment: true,
            },
          },
        },
      });
    }
  }

  createBook(createTaskDto: CreateBookDto): Promise<Book | null> {
    const { title, description, rentFee, authorName } = createTaskDto;

    return this.prisma.book.create({
      data: {
        title,
        description,
        rentFee,
        authorName
      },
    });
  }

  async getBookById(id: number): Promise<Book | null> {
    const book = await this.prisma.book.findUnique({
      where: {
        id,
      },
      include: {
        comments: {
          select: {
            id: true,
            bookId: true,
            comment: true,
            DateTime: true,
            User: true,
          },
        },
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

  async rentBook(
    rentBookDto: RentBookDto
  ): Promise<{ success: boolean; message: string } | null> {
    try {
      const { memberId, bookId } = rentBookDto;

      if (!memberId || !bookId) {
        throw new BadRequestException('BookId or memberId missing!');
      }

      // Check if already rented and return error
      // also check if member is a defaulter and return error

      await this.prisma.book.update({
        where: {
          id: bookId,
        },
        data: {
          status: 'RENTED',
        },
      });

      await this.prisma.rentedBooks.create({
        data: {
          bookId,
          memberId,
        },
      });
      return { success: true, message: 'Book rented succesfully' };
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException('Something went wrong!');
    }
  }

  async returnRentedBook(
    id: number
  ): Promise<{ success: boolean; message: string } | null> {
    try {
      await this.prisma.book.update({
        where: {
          id,
        },
        data: {
          status: 'AVAILABLE',
        },
      });

      return { success: true, message: 'Unrented Successfully' };
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException('Something went wrong!');
    }
  }

  async addComment(
    bookId: number,
    addCommentDto: AddCommentDto
  ): Promise<{ success: boolean; message: string } | null> {
    try {
      const { comment, username } = addCommentDto;

      if (!comment || !username) {
        throw new BadRequestException('All required Information not provided');
      }

      const book = await this.prisma.book.findFirst({
        where: {
          id: bookId,
        },
      });

      if (!book) {
        throw new BadRequestException('Book Not Found');
      }

      await this.prisma.comment.create({
        data: {
          comment,
          userName: username,
          bookId,
        },
      });

      // const jsonComment = [{id: 'randomId', comment, memberId}] as Prisma.JsonArray;

      // await this.prisma.book.update({
      //   where: {
      //     id: bookId
      //   },
      //   data: {
      //     comments: jsonComment
      //   }
      // });

      return { success: true, message: 'comment added succesfully' };
    } catch (err) {
      console.log(err);
      return { success: false, message: 'comment addition Failed' };
    }
  }
}
