import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Module({
  controllers: [BooksController],
  providers: [BooksService, PrismaService, CloudinaryService],
})
export class BooksModule {}
