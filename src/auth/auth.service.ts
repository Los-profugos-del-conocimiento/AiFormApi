import { RedisService } from '../redis/redis.service';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { User } from './entities/user.entity';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
// import jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private readonly redisService: RedisService,
        private readonly configService: ConfigService,
        private readonly jwtService: JwtService,
    ) { }

    async getUser(email: string): Promise<User> {
        return this.userRepository.findOne({ where: { email } });
    }

    async createUser(user: User): Promise<User> {
        return this.userRepository.save(this.userRepository.create(user));
    }

    async generateToken({ email, id }: User): Promise<string> {
        return this.jwtService.sign({ email, id });
    }

    async isTokenRevoked(token: string): Promise<boolean> {
        const isRevoked = await this.redisService.get(`revoked:${token}`);
        return Boolean(isRevoked);
    }

    async revokeToken(token: string): Promise<void> {
        // const decoded = jwt.decode(token);
        // const exp = (decoded as any).exp;
        // const now = Math.floor(Date.now() / 1000);

        // await this.redisService.set(`revoked:${token}`, 'true', exp - now);

        await this.redisService.set(`revoked:${token}`, 'true', 60 * 60 * 24 * 30);

    }

    async getTokensRevoked(): Promise<string[]> {
        return this.redisService.keys('revoked:*');
    }
}
