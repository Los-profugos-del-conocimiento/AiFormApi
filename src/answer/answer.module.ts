import { AnswerController } from './answer.controller';
import { Answer } from './entities/answer.entity';
import { AnswerService } from './answer.service';
import { ItemModule } from '../item/item.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

@Module({
    imports: [TypeOrmModule.forFeature([Answer]), ItemModule],
    controllers: [AnswerController],
    providers: [AnswerService],
    exports: [AnswerService],
})
export class AnswerModule {}
