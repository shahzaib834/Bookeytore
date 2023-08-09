import { PrismaService } from '../prisma.service';
import { Member } from '@prisma/client';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
export declare class MembersService {
    private prisma;
    constructor(prisma: PrismaService);
    getAllMembers(query: {
        filter: string;
    }): Promise<Member[] | null>;
    createMember(createMemberDto: CreateMemberDto): Promise<Member | null>;
    getMemberById(id: number): Promise<Member | null>;
    deleteMemberById(id: number): Promise<Member | null>;
    updateMemberById(id: number, updateMemberDto: UpdateMemberDto): Promise<Member | null>;
    addMonthlySubscription(id: number): Promise<void>;
}
