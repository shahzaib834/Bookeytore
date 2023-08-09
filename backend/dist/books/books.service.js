"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BooksService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
let BooksService = exports.BooksService = class BooksService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    getAllBooks(query) {
        if (Object.keys(query).length === 0)
            return this.prisma.book.findMany();
        return this.prisma.book.findMany({
            where: {
                OR: [
                    { title: { contains: query.filter } },
                    { description: { contains: query.filter } },
                ],
            },
        });
    }
    createBook(createTaskDto) {
        const { title, description, rentFee } = createTaskDto;
        return this.prisma.book.create({
            data: {
                title,
                description,
                rentFee
            },
        });
    }
    async getBookById(id) {
        const book = await this.prisma.book.findUnique({
            where: {
                id,
            },
        });
        if (!book) {
            throw new common_1.NotFoundException(`Task with id: ${id} not found`);
        }
        return book;
    }
    async deleteBookById(id) {
        await this.getBookById(id);
        const deletedBook = await this.prisma.book.delete({
            where: {
                id,
            },
        });
        return deletedBook;
    }
    async updateBookById(id, updateTaskDto) {
        const { title, description } = updateTaskDto;
        return await this.prisma.book.update({
            where: { id },
            data: { title, description },
        });
    }
    async rentBook(rentBookDto) {
        try {
            const { memberId, bookId } = rentBookDto;
            if (!memberId || !bookId) {
                throw new common_1.BadRequestException('BookId or memberId missing!');
            }
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
        }
        catch (err) {
            console.log(err);
            throw new common_1.InternalServerErrorException('Something went wrong!');
        }
    }
    async returnRentedBook(id) {
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
        }
        catch (err) {
            console.log(err);
            throw new common_1.InternalServerErrorException('Something went wrong!');
        }
    }
};
exports.BooksService = BooksService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], BooksService);
//# sourceMappingURL=books.service.js.map