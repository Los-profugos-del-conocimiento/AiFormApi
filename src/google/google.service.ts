import { Injectable } from '@nestjs/common';
import { CreateGoogleDto } from './dto/create-google.dto';
import { UpdateGoogleDto } from './dto/update-google.dto';
import { google } from 'googleapis';

@Injectable()
export class GoogleService {
    private readonly oauth2Client = new google.auth.OAuth2(
        process.env.GOOGLE_CLIENT_ID,
        process.env.GOOGLE_CLIENT_SECRET,
        process.env.GOOGLE_REDIRECT_URI
    );

    async getAuthorizationUrl(): Promise<string> {
        return this.oauth2Client.generateAuthUrl({
            access_type: 'offline',
            scope: [
              'https://www.googleapis.com/auth/userinfo.profile',
              'https://www.googleapis.com/auth/userinfo.email'
            ],
        });
    }

    async getAccessToken(code: string): Promise<string> {
        const { tokens } = await this.oauth2Client.getToken(code);
        console.log({ tokens });
        this.oauth2Client.setCredentials(tokens);
        return tokens.access_token;
    }
}
