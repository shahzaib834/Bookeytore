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
        take: Number(query.limit),
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
        take: Number(query.limit),
        orderBy: {
          createdAt: 'desc',
        },
        where: {
          OR: [
            { title: { contains: query.filter } },
            { authorName: { contains: query.filter } },
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

  async createBook(createTaskDto: CreateBookDto): Promise<Book | null> {
    try {
      const {
        title,
        rentedQuantity,
        stock,
        rentFee,
        authorName,
        image_public_id,
        image_url,
      } = createTaskDto;

      const rent = typeof rentFee === 'number' ? rentFee : parseInt(rentFee);

      return this.prisma.book.create({
        data: {
          title,
          rentedQuantity,
          rentFee: rent,
          authorName,
          stock,
          image: {
            public_id: image_public_id || '',
            url: image_url || '',
          },
        },
      });
    } catch (error) {
      console.log(error);
    }
  }

  async getBookById(id: number): Promise<Book | null> {
    const book = await this.prisma.book.findUnique({
      where: {
        id,
      },
      include: {
        RentedBooks: {
          include: {
            member: true,
          },
        },
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
    updateBookDto: UpdateBookDto
  ): Promise<Book | null> {
    const { title, authorName, rentFee, rentedQuantity, stock, status } =
      updateBookDto;

    return await this.prisma.book.update({
      where: { id },
      data: { title, authorName, rentFee, rentedQuantity, status },
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

      const book = await this.prisma.book.findFirst({
        where: {
          id: bookId,
        },
      });

      if (
        !book ||
        book.status === 'ALL_RENTED' ||
        book.stock <= book.rentedQuantity
      ) {
        throw new BadRequestException('Book not found or not available!');
      }

      const member = await this.prisma.member.findFirst({
        where: {
          id: memberId,
        },
      });

      if (!member || member.isDefaulter) {
        throw new BadRequestException(
          'Member not found or Member is a defaulter!'
        );
      }

      await this.prisma.book.update({
        where: {
          id: bookId,
        },
        data: {
          status:
            book.rentedQuantity + 1 === book.stock ? 'ALL_RENTED' : 'AVAILABLE',
          rentedQuantity: book.rentedQuantity + 1,
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
    bookId: number,
    memberId: number
  ): Promise<{ success: boolean; message: string } | null> {
    try {
      const book = await this.prisma.book.findFirst({
        where: {
          id: bookId,
        },
      });

      if (!book) {
        throw new BadRequestException('Book not found');
      }

      const member = await this.prisma.member.findFirst({
        where: {
          id: memberId,
        },
      });

      if (!member) {
        throw new BadRequestException('Member not found');
      }

      await this.prisma.book.update({
        where: {
          id: bookId,
        },
        data: {
          status: 'AVAILABLE',
          rentedQuantity: book.rentedQuantity - 1,
        },
      });

      const rentedBook = await this.prisma.rentedBooks.findFirst({
        where: {
          bookId,
          memberId,
        },
      });

      if (rentedBook) {
        await this.prisma.rentedBooks.delete({
          where: {
            id: rentedBook.id,
          },
        });
      }

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
