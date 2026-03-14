import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from '../users/entities/user.entity';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private readonly jwtService: JwtService,
    ) { }

    async signup(signupDto: SignupDto): Promise<Omit<User, 'password'>> {
        const hashedPassword = await bcrypt.hash(signupDto.password, 10);

        const user = this.userRepository.create({
            ...signupDto,
            password: hashedPassword,
        });

        const saved = await this.userRepository.save(user);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password, ...result } = saved;
        return result as Omit<User, 'password'>;
    }

    async login(loginDto: LoginDto): Promise<{ access_token: string }> {
        const user = await this.userRepository.findOne({
            where: { email: loginDto.email },
        });

        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const isMatch = await bcrypt.compare(loginDto.password, user.password);
        if (!isMatch) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const payload = { sub: user.id, email: user.email };
        const access_token = await this.jwtService.signAsync(payload);

        return { access_token };
    }
}
