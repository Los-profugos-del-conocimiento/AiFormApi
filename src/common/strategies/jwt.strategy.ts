import { UnauthorizedException, NotFoundException, Injectable } from '@nestjs/common';
import { JwtPayload } from '../interfaces/jwt-payload.interface';
import { AuthService } from '../../auth/auth.service';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor(
        private readonly authService: AuthService,
        private readonly configService: ConfigService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([
                req => {
                    if (!req || !req.cookies) return null;
                    return req.cookies[this.configService.get<string>('jwtCookieName')];
                },
            ]),
            secretOrKey: configService.get<string>('jwtSecret'),
            passReqToCallback: true,
        });
    }

    async validate(req: Request, { email }: JwtPayload) {
        const token = req.cookies[this.configService.get<string>('JWT_COOKIE_NAME')];

        if (await this.authService.isTokenRevoked(token))
            throw new UnauthorizedException('Token revoked.');

        const user = await this.authService.getUserByEmail(email)

        if (!user)
            throw new NotFoundException('User doesn\'t exist.');

        if (!user.isActive)
            throw new UnauthorizedException('User is inactive.');

        return user;
    }
}