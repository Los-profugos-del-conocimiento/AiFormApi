import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ShortUuidPipe } from '../common/pipes/short-uuid.pipe';
import { CreateAnswersDto, UpdateAnswersDto } from './dto';
import { AnswerMutationPipe } from './answer.pipe';
import { AnswerService } from './answer.service';

@Controller('answer')
export class AnswerController {
    constructor(private readonly answerService: AnswerService) {}

    @Post()
    async create(@Body(AnswerMutationPipe) createAnswersDto: CreateAnswersDto) {
        return this.answerService.create(createAnswersDto.answers);
    }

    @Patch()
    update(@Body(AnswerMutationPipe) updateAnswersDto: UpdateAnswersDto) {
        return this.answerService.update(updateAnswersDto.answers);
    }

    @Delete(':id')
    async remove(@Param('id', ShortUuidPipe) id: string) {
        const answerDeleted = await this.answerService.remove(id);
        return { message: 'Answer removed.', answerDeleted }
    }
}
