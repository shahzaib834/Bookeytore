import { User } from '@prisma/client';
import { CreateUserDto } from 'src/auth/dto/create-user.dto';
import { AuthService } from './auth.service';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    signUp(createUserDto: CreateUserDto): Promise<{
        user: User | null;
        accessToken: string;
    }>;
    signIn(body: {
        username: string;
        password: string;
    }): Promise<{
        success: boolean;
        token: string;
    }>;
}
