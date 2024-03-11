import { GoogleFormsAdapter } from './adapters/google-forms.adapter';
import { JwtStrategy } from './strategies/jwt.strategy';
import { AxiosAdapter } from './adapters/axios.adapter';
import { AuthModule } from '../auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';

@Module({
    imports: [AuthModule, ConfigModule],
    providers: [AxiosAdapter, GoogleFormsAdapter, JwtStrategy],
    exports: [AxiosAdapter, GoogleFormsAdapter],
})
export class CommonModule {}
