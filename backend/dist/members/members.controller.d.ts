import { Member } from '@prisma/client';
import { MembersService } from './members.service';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
export declare class MembersController {
    private membersService;
    constructor(membersService: MembersService);
    getAllMembers(query: {
        filter: string;
    }): Promise<Member[] | null>;
    createTask(createMemberDto: CreateMemberDto): Promise<Member | null>;
    getMemberById(id: number): Promise<Member | null>;
    updateMemberById(id: number, updateMemberDto: UpdateMemberDto): Promise<Member | null>;
    deleteMemberById(id: number): Promise<import("@prisma/client/runtime/library").GetResult<{
        id: number;
        name: string;
        email: string;
        isMonthlySubscribed: boolean;
        monthlySubscriptionEndDate: Date;
        isDefaulter: boolean;
        createdAt: Date;
        updatedAt: Date;
    }, unknown> & {}>;
    addMonthlySubscription(id: number): Promise<void>;
}
