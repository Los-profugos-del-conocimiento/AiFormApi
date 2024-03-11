import { UnauthorizedException, Injectable } from '@nestjs/common';
import { JwtPayload } from '../interfaces/jwt-payload.interface';
import { AuthService } from '../../auth/auth.service';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

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
                    const token = req.cookies[this.configService.get<string>('jwtCookieName')];

                    // const tokenRevoked = await this.authService.isTokenRevoked(token);

                    // if (tokenRevoked)
                    //     throw new UnauthorizedException('Token revoked.');

                    return token;
                },
            ]),
            secretOrKey: configService.get<string>('jwtSecret'),
        });
    }

    async validate({ email }: JwtPayload) {
        const user = await this.authService.getUser(email)

        if (!user)
            throw new UnauthorizedException('User not found.');

        if (!user.isActive)
            throw new UnauthorizedException('User is inactive.');

        return user;
    }
}