import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
    constructor(
        private readonly configService: ConfigService,
    ) {
        super({
            clientID: configService.get<string>('googleClientId'),
            clientSecret: configService.get<string>('googleClientSecret'),
            callbackURL: configService.get<string>('googleRedirectUri'),
            scope: ['email', 'profile'],
        });
    }

    async validate(accessToken: string, refreshToken: string, profile: any, done: VerifyCallback): Promise<any> {
        const { name: fullName, email, picture } = profile._json;

        done(null, { email, fullName, picture, accessToken, refreshToken });
    }
}