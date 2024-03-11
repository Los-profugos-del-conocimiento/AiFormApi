import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly configService: ConfigService,
    ) {}

    @Get()
    @UseGuards(AuthGuard('jwt'))
    async getUser(
        @Req() request: Request,
    ) {
        return request.user;
    }
    
    @Get('google')
    @UseGuards(AuthGuard('google'))
    async googleAuth(
        @Req() request: Request,
        @Res() response: Response,
    ) {
        let user = await this.authService.getUser(request.user.email);

        if (!user) user = await this.authService.createUser(request.user);

        const token: string = await this.authService.generateToken(user);

        response.cookie(this.configService.get<string>('jwtCookieName'), token, { 
            httpOnly: true, 
            secure: true, 
            sameSite: 'strict', 
            maxAge: 30 * 24 * 60 * 60 * 1000 
        });
        response.redirect(`${this.configService.get<string>('urlFrontend')}/myForms`);
    }

    @Get('logout')
    @UseGuards(AuthGuard('jwt'))
    async logout(
        @Req() request: Request,
        @Res() response: Response,
    ) {
        this.authService.revokeToken(request.cookies.aiform_token_420);
        response.clearCookie(this.configService.get<string>('jwtCookieName'));
        response.redirect(this.configService.get<string>('urlFrontend'));
    }

    @Get('revoked')
    async getTokensRevoked() {
        return this.authService.getTokensRevoked();
    }
}
