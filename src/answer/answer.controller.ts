import { 
    Controller, Get, Post, Body, Patch, Param, Delete,
    InternalServerErrorException 
} from '@nestjs/common';
import { validateOrReject, ValidationError } from 'class-validator';
import { ShortUuidPipe } from '../common/pipes/short-uuid.pipe';
import { ValidateArrayPipe } from '../common/pipes/array.pipe';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';
import { plainToInstance } from 'class-transformer';
import { AnswerService } from './answer.service';

@Controller('answer')
export class AnswerController {
    constructor(private readonly answerService: AnswerService) {}

    @Post()
    async create(@Body(ValidateArrayPipe) createAnswerDto: CreateAnswerDto[]) {
        try {
            for (const item of createAnswerDto)
                validateOrReject(plainToInstance(CreateAnswerDto, item))

            return this.answerService.create(createAnswerDto);
        } catch (errors) {
            if (errors instanceof Array && errors[0] instanceof ValidationError)
                throw errors[0];

            throw new InternalServerErrorException();
        }
    }

    @Get()
    findAll() {
        return this.answerService.findAll();
    }

    @Get(':id')
    findOne(@Param('id', ShortUuidPipe) id: string) {
        return this.answerService.findOne(id);
    }

    @Patch()
    update(@Body() updateAnswerDto: UpdateAnswerDto[]) {
        return this.answerService.update(updateAnswerDto);
    }

    @Delete(':id')
    async remove(@Param('id', ShortUuidPipe) id: string) {
        const answerDeleted = await this.answerService.remove(id);
        return { message: 'Answer removed.', answerDeleted }
    }
}
