import { PrismaService } from '../prisma.service';
import { CreateUserDto } from 'src/auth/dto/create-user.dto';
import { User } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private prisma;
    private jwtService;
    constructor(prisma: PrismaService, jwtService: JwtService);
    signUp(createUserDto: CreateUserDto): Promise<{
        user: User | null;
        accessToken: string;
    }>;
    signIn(body: {
        username: string;
        password: string;
    }): Promise<{
        token: string;
        success: boolean;
    }>;
}
