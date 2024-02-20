import { GoogleFormsModule } from './google-forms/google-forms.module';
import { ChatGptService } from './chat-gpt/chat-gpt.service';
import { ChatGptModule } from './chat-gpt/chat-gpt.module';
import { OpenAiModule } from './open-ai/open-ai.module';
import { CommonModule } from './common/common.module';
import { Form } from './form/entities/form.entity';
import { FormModule } from './form/form.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { ItemModule } from './item/item.module';
import { AnswerModule } from './answer/answer.module';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'sqlite',
            database: 'aiform.sqlite',
            entities: [__dirname + '/**/*.entity.{ts,js}'],
            synchronize: true,
        }),
        FormModule,
        CommonModule,
        GoogleFormsModule,
        ChatGptModule,
        OpenAiModule,
        ItemModule,
        AnswerModule,
    ],
    providers: [ChatGptService],
})
export class AppModule {}
