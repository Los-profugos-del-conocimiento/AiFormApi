import { Controller, Get, Post, Delete, Body, Req, Res, UseGuards } from '@nestjs/common';
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
        let user = await this.authService.getUserByEmail(request.user.email);

        if (!user) user = await this.authService.createUser(request.user);

        const token: string = await this.authService.generateToken(user);

        response.cookie(this.configService.get<string>('jwtCookieName'), token, { 
            httpOnly: true, 
            secure: true, 
            sameSite: 'strict', 
            maxAge: 1 * 24 * 60 * 60 * 1000 // 1 day
            // maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
        });
        response.redirect(this.configService.get<string>('urlFrontend'));
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

    @Post('revoke')
    @UseGuards(AuthGuard('jwt'))
    async revokeToken(
        @Req() request: Request,
    ) {
        await this.authService.revokeToken(request.cookies[this.configService.get<string>('jwtCookieName')]);
        return 'Token revoked.';
    }

    @Post('remove-revoked')
    async removeRevoked() {
        await this.authService.removeTokensRevoked();
        return 'Revoked tokens removed.';
    }

    @Delete('remove-user')
    @UseGuards(AuthGuard('jwt'))
    async removeUser(
        @Req() request: Request
    ) {
        const deleteResult = await this.authService.removeUser(request.user.id);
        return { message: 'User removed.', user: request.user, deleteResult };
    }
}
