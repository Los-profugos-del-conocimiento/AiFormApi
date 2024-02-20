import { AnswerModule } from '../answer/answer.module';
import { ItemController } from './item.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Item } from './entities/item.entity';
import { ItemService } from './item.service';
import { Module } from '@nestjs/common';

@Module({
    imports: [TypeOrmModule.forFeature([Item]), AnswerModule],
    controllers: [ItemController],
    providers: [ItemService],
    exports: [ItemService],
})
export class ItemModule {}
