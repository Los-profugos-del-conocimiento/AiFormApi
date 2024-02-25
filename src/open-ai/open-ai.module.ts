import { ConfigModule, ConfigService } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { OpenAI } from 'openai';

@Module({
    imports: [ConfigModule],
    providers: [{
        provide: OpenAI,
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => {
            return new OpenAI(configService.get('OPENAI_API_KEY'));
        }
    }],
    exports: [OpenAI],
})
export class OpenAiModule {}
