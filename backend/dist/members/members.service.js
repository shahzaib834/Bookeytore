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
exports.MembersService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
const moment = require("moment");
let MembersService = exports.MembersService = class MembersService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    getAllMembers(query) {
        if (Object.keys(query).length === 0)
            return this.prisma.member.findMany();
        return this.prisma.member.findMany({
            where: {
                OR: [
                    { name: { contains: query.filter } },
                ],
            },
        });
    }
    createMember(createMemberDto) {
        const { name, email } = createMemberDto;
        return this.prisma.member.create({
            data: {
                name,
                email,
            },
        });
    }
    async getMemberById(id) {
        const member = await this.prisma.member.findUnique({
            where: {
                id,
            },
        });
        if (!member) {
            throw new common_1.NotFoundException(`Task with id: ${id} not found`);
        }
        return member;
    }
    async deleteMemberById(id) {
        await this.getMemberById(id);
        const deletedMember = await this.prisma.member.delete({
            where: {
                id,
            },
        });
        return deletedMember;
    }
    async updateMemberById(id, updateMemberDto) {
        const { name, email } = updateMemberDto;
        return await this.prisma.member.update({
            where: { id },
            data: { name, email },
        });
    }
    async addMonthlySubscription(id) {
        let currentDate = moment();
        let nextMonth = moment(currentDate).add(1, 'M').toDate();
        await this.prisma.member.update({
            where: {
                id
            },
            data: {
                isMonthlySubscribed: true,
                monthlySubscriptionEndDate: nextMonth
            }
        });
    }
};
exports.MembersService = MembersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], MembersService);
//# sourceMappingURL=members.service.js.map