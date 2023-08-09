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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
const bcrypt = require("bcrypt");
const jwt_1 = require("@nestjs/jwt");
let AuthService = exports.AuthService = class AuthService {
    constructor(prisma, jwtService) {
        this.prisma = prisma;
        this.jwtService = jwtService;
    }
    async signUp(createUserDto) {
        const { username, password } = createUserDto;
        const exist = await this.prisma.user.findFirst({
            where: {
                username,
            },
        });
        if (exist) {
            throw new common_1.ConflictException('User already exists');
        }
        const payload = { username };
        const accessToken = await this.jwtService.sign(payload);
        const user = await this.prisma.user.create({
            data: {
                username,
                password,
            },
        });
        return { user, accessToken };
    }
    async signIn(body) {
        const { username, password } = body;
        const user = await this.prisma.user.findFirst({
            where: { username },
        });
        const isAuthenticated = await bcrypt.compare(password, user.password);
        if (!user || !isAuthenticated)
            throw new common_1.UnauthorizedException('Wrong name or password');
        const payload = { username };
        const accessToken = await this.jwtService.signAsync(payload);
        return { token: accessToken, success: true };
    }
};
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService, jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map