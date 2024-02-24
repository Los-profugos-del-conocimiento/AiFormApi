import { Module } from '@nestjs/common';
import { OpenAI } from 'openai';

@Module({
    providers: [{
        provide: OpenAI,
        useValue: new OpenAI({ apiKey: 'YOUR_OPENAI_API_KEY' }),
    }],
    exports: [OpenAI],
})
export class OpenAiModule {}
