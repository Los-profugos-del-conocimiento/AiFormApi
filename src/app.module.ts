import { Module } from '@nestjs/common';
import { FormModule } from './form/form.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Form } from './form/entities/form.entity';
import { CommonModule } from './common/common.module';
import { GoogleFormsModule } from './google-forms/google-forms.module';
import { ChatGptService } from './chat-gpt/chat-gpt.service';
import { ChatGptModule } from './chat-gpt/chat-gpt.module';
import { OpenAiModule } from './open-ai/open-ai.module';

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
  ],
  providers: [ChatGptService],
})
export class AppModule {}
