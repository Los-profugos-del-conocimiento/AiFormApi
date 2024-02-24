import { ChatGptModule } from '../chat-gpt/chat-gpt.module';
import { FormController } from './form.controller';
import { ItemModule } from '../item/item.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Form } from './entities/form.entity';
import { FormService } from './form.service';
import { Module } from '@nestjs/common';

@Module({
    imports: [TypeOrmModule.forFeature([Form]), ChatGptModule],
    controllers: [FormController],
    providers: [FormService],
    exports: [FormService],
})
export class FormModule {}
