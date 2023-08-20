import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Member } from '@prisma/client';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import * as moment from 'moment';

@Injectable()
export class MembersService {
  constructor(private prisma: PrismaService) {}

  getAllMembers(query: {
    filter: string;
    page: number;
    limit: number;
  }): Promise<Member[] | null> {
    if (!query.page) query.page = 1;
    if (!query.limit) query.limit = 10;
    const skip = query.page * query.limit - query.limit;

    if (!query.filter) {
      return this.prisma.member.findMany({
        skip,
        take: query.limit,
        orderBy: {
          createdAt: 'desc',
        },
      });
    } else {
      return this.prisma.member.findMany({
        skip,
        take: query.limit,
        orderBy: {
          createdAt: 'desc',
        },
        where: {
          OR: [
            { email: { contains: query.filter } },
            { name: { contains: query.filter } },
          ],
        },
      });
    }
  }

  createMember(createMemberDto: CreateMemberDto): Promise<Member | null> {
    const { name, email } = createMemberDto;

    return this.prisma.member.create({
      data: {
        name,
        email,
      },
    });
  }

  async getMemberById(id: number): Promise<Member | null> {
    const member = await this.prisma.member.findUnique({
      where: {
        id,
      },
      include: {
        RentedBooks: {
          include: {
            book: true,
          },
        },
      },
    });

    if (!member) {
      throw new NotFoundException(`Task with id: ${id} not found`);
    }
    return member;
  }

  async deleteMemberById(id: number): Promise<Member | null> {
    await this.getMemberById(id);

    const deletedMember = await this.prisma.member.delete({
      where: {
        id,
      },
    });
    return deletedMember;
  }

  async updateMemberById(
    id: number,
    updateMemberDto: UpdateMemberDto
  ): Promise<Member | null> {
    const { name, email } = updateMemberDto;

    return await this.prisma.member.update({
      where: { id },
      data: { name, email },
    });
  }

  async addMonthlySubscription(id: number) {
    let currentDate = moment();
    let nextMonth = moment(currentDate).add(1, 'M').toDate();
    await this.prisma.member.update({
      where: {
        id,
      },
      data: {
        isMonthlySubscribed: true,
        monthlySubscriptionEndDate: nextMonth,
      },
    });
  }
}
