import { RedisService } from '../redis/redis.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { User } from './entities/user.entity';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

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

    async removeUser(id: string): Promise<DeleteResult> {
        return this.userRepository.delete(id);
    }

    async generateToken({ email, id }: User): Promise<string> {
        return this.jwtService.sign({ email, id });
    }

    async isTokenRevoked(token: string): Promise<boolean> {
        const isRevoked = await this.redisService.get(`revoked:${token}`);
        return Boolean(isRevoked);
    }

    async revokeToken(token: string): Promise<void> {
        const decoded = this.jwtService.decode(token);
        const exp = decoded.exp * 1000;
        const now = Date.now();

        await this.redisService.set(`revoked:${token}`, 'true', exp - now);
    }

    getTokensRevoked(): Promise<string[]> {
        return this.redisService.keys('revoked:*');
    }

    async removeTokensRevoked(): Promise<void> {
        const keys = await this.redisService.keys('revoked:*');
        keys.length > 0 && await this.redisService.del(keys);
    }
}
