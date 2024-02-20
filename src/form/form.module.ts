import { ChatGptModule } from '../chat-gpt/chat-gpt.module';
import { AnswerService } from './services/answer.service';
import { FormService } from './services/form.service';
import { ItemService } from './services/item.service';
import { FormController } from './form.controller';
import { Answer } from './entities/answer.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Form } from './entities/form.entity';
import { Item } from './entities/item.entity';
import { Module } from '@nestjs/common';

@Module({
    imports: [TypeOrmModule.forFeature([Form, Item, Answer]), ChatGptModule],
    controllers: [FormController],
    providers: [FormService, ItemService, AnswerService],
    exports: [FormService],
})
export class FormModule {}
