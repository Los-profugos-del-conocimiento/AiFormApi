import { JwtStrategy } from '../common/strategies/jwt.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GoogleStrategy } from './strategies/jwt.strategy';
import { RedisModule } from '../redis/redis.module';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { AuthService } from './auth.service';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

@Module({
    controllers: [AuthController],
    providers: [AuthService, GoogleStrategy, JwtStrategy],
    imports: [
        ConfigModule,
        RedisModule,
        TypeOrmModule.forFeature([User]),
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => ({
                secret: configService.get<string>('jwtSecret'),
                signOptions: { expiresIn: '1d' }
            })
        }),
    ],
    exports: [AuthService],
})
export class AuthModule {}
