import { Module } from '@nestjs/common';
import { ChatGptService } from './chat-gpt.service';
import { OpenAiModule } from '../open-ai/open-ai.module';

@Module({
    imports: [OpenAiModule],
    providers: [ChatGptService],
    exports: [ChatGptService],
})
export class ChatGptModule {}
