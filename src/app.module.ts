import { GoogleFormsModule } from './google-forms/google-forms.module';
import { JoiValidationSchema } from './config/joi.validation';
import { ChatGptService } from './chat-gpt/chat-gpt.service';
import { ChatGptModule } from './chat-gpt/chat-gpt.module';
import { AppConfiguration } from './config/app.config';
import { OpenAiModule } from './open-ai/open-ai.module';
import { CommonModule } from './common/common.module';
import { AnswerModule } from './answer/answer.module';
import { Form } from './form/entities/form.entity';
import { FormModule } from './form/form.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemModule } from './item/item.module';
import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';

@Module({
    imports: [
        ConfigModule.forRoot({
            load: [AppConfiguration],
            validationSchema: JoiValidationSchema,
        }),
        TypeOrmModule.forRoot({
            type: 'sqlite',
            database: 'aiform.sqlite',
            entities: [__dirname + '/**/*.entity.{ts,js}'],
            synchronize: true,
        }),
        CommonModule,
 
        // Entities
        FormModule,
        ItemModule,
        AnswerModule,
        
        // Integrations
        GoogleFormsModule,
        ChatGptModule,
        OpenAiModule,
    ],
    providers: [ChatGptService],
})
export class AppModule {}
