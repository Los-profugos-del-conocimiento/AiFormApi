import { GoogleFormsModule } from './google-forms/google-forms.module';
import { JoiValidationSchema } from './config/joi.validation';
// import { ChatGptService } from './chat-gpt/chat-gpt.service';
import { ChatGptModule } from './chat-gpt/chat-gpt.module';
import { OpenAiModule } from './open-ai/open-ai.module';
import { AppConfiguration } from './config/app.config';
import { CommonModule } from './common/common.module';
import { AnswerModule } from './answer/answer.module';
import { RedisModule } from './redis/redis.module';
import { FormModule } from './form/form.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemModule } from './item/item.module';
import { AuthModule } from './auth/auth.module';
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

        // Authentication
        AuthModule,
        RedisModule,
    ],
    // providers: [ChatGptService],
})
export class AppModule {}
