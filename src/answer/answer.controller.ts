import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ShortUuidPipe } from '../common/pipes/short-uuid.pipe';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';
import { AnswerService } from './answer.service';

@Controller('answer')
export class AnswerController {
    constructor(private readonly answerService: AnswerService) {}

    @Post()
    create(@Body() createAnswerDto: CreateAnswerDto) {
        return this.answerService.create(createAnswerDto);
    }

    @Get()
    findAll() {
        return this.answerService.findAll();
    }

    @Get(':id')
    findOne(@Param('id', ShortUuidPipe) id: string) {
        return this.answerService.findOne(id);
    }

    @Patch(':id')
    update(
        @Param('id', ShortUuidPipe) id: string, 
        @Body() updateAnswerDto: UpdateAnswerDto
    ) {
        return this.answerService.update(id, updateAnswerDto);
    }

    @Delete(':id')
    remove(@Param('id', ShortUuidPipe) id: string) {
        return this.answerService.remove(id);
    }
}
