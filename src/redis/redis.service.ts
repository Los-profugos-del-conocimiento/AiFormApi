import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Redis from 'ioredis';

@Injectable()
export class RedisService implements OnModuleInit, OnModuleDestroy {
    private readonly client: Redis;

    constructor(
        private readonly configService: ConfigService,
    ) {
        this.client = new Redis({ host: this.configService.get<string>('redisHost') });
    }

    onModuleInit() {
        console.log('Redis client connected.');
        this.client.on('connect', () => console.log('Redis connection established'));
        this.client.on('error', (err) => console.log('Redis Error', err));
    }

    onModuleDestroy() {
        this.client.quit();
    }

    getClient(): Redis {
        return this.client;
    }

    async keys(pattern: string): Promise<string[]> {
        return this.client.keys(pattern);
    }

    async set(key: string, value: string, expireSeconds: number): Promise<'OK'|null> {
        return this.client.setex(key, expireSeconds, value);
    }

    async setWithExpiry(key: string, value: string, expireSeconds: number): Promise<'OK' | null> {
        return this.client.set(key, value, 'EX', expireSeconds);
    }

    async get(key: string): Promise<string | null> {
        return await this.client.get(key);
    }

    async del(key: string[]): Promise<number> {
        return this.client.del(key);
    }
}
