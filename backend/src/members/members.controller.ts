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
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Member } from '@prisma/client';
import { MembersService } from './members.service';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';

@Controller('members')
export class MembersController {
  constructor(private membersService: MembersService) {}

  @Get()
  getAllMembers(
    @Query() query: { filter: string; page: number; limit: number }
  ): Promise<Member[] | null> {
    return this.membersService.getAllMembers(query);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createMember(
    @Body() createMemberDto: CreateMemberDto
  ): Promise<Member | null> {
    return this.membersService.createMember(createMemberDto);
  }

  @Get('/:id')
  getMemberById(@Param('id', ParseIntPipe) id: number): Promise<Member | null> {
    return this.membersService.getMemberById(id);
  }

  @Put('/:id')
  updateMemberById(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) updateMemberDto: UpdateMemberDto
  ): Promise<Member | null> {
    return this.membersService.updateMemberById(id, updateMemberDto);
  }

  @Delete('/:id')
  deleteMemberById(@Param('id', ParseIntPipe) id: number) {
    return this.membersService.deleteMemberById(id);
  }

  @Post(':id/add-monthly-sub')
  addMonthlySubscription(@Param('id', ParseIntPipe) id: number) {
    return this.membersService.addMonthlySubscription(id);
  }
}
