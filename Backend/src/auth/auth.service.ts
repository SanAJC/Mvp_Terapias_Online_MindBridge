import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { LoginDto } from './dto/login';
import { RegisterDto } from './dto/register';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
    private readonly jwtSecret = process.env.JWT_SECRET ?? '';

    constructor(private readonly prisma: PrismaService) {}

    async hashPassword(password : string): Promise<string> {
        const salt = await bcrypt.genSalt();
        return bcrypt.hash(password, salt);
    }

    async generateToken(userId : string): Promise<string> {
        return jwt.sign({ userId }, this.jwtSecret, { expiresIn: '1h' });
    }

     async register( data : RegisterDto): Promise<{token:string }> {
        const handlePassword = await this.hashPassword(data.password)
        const user = await this.prisma.user.create({
            data : { email: data.email, password: handlePassword }
        });

        const token = await this.generateToken(user.id);
        return { token };
    }

    async login(data : LoginDto): Promise<{ token: string }> {
        const user = await this.prisma.user.findUnique({ where: { email: data.email } });
        if (!user || !(await bcrypt.compare(data.password, user.password))) {
          throw new UnauthorizedException('Invalid credentials');
        }
        const token = await this.generateToken(user.id);
        return { token };
    }
    
    async validateToken(token: string): Promise<any> {
        try {
            return jwt.verify(token, this.jwtSecret);
        } catch (error) {
            throw new UnauthorizedException('Invalid or expired token');
        }
    }
    
    
}