import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ShortUuidPipe } from '../common/pipes/short-uuid.pipe';
import { ChatGptService } from '../chat-gpt/chat-gpt.service';
import { CreateFormDto } from './dto/create-form.dto';
import { UpdateFormDto } from './dto/update-form.dto';
import { Form } from './entities/form.entity';
import { FormService } from './form.service';
import { ValidationPipe } from './form.pipe';

@Controller('form')
export class FormController {
    constructor(
        private readonly formService: FormService,
        private readonly chatGptService: ChatGptService
    ) {}

    @Post()
    async create(@Body(ValidationPipe) createFormDto: CreateFormDto) {
        const formResponse = await this.chatGptService.generateCompletions(createFormDto.completions);
        
        const { questions } = JSON.parse(formResponse);

        delete createFormDto.completions;
        
        const form: Form = { ...createFormDto, items: questions };

        return this.formService.create(form);
    }

    @Get()
    async findAll() {
        return this.formService.findAll();
    }

    @Get(':id')
    findOne(@Param('id', ShortUuidPipe) id: string) {
        return this.formService.findOne(id);
    }

    @Patch(':id')
    update(
        @Param('id', ShortUuidPipe) id: string, 
        @Body() updateFormDto: UpdateFormDto
    ) {
        // return this.formService.update(id, updateFormDto);
    }

    @Delete(':id')
    remove(@Param('id', ShortUuidPipe) id: string) {
        return this.formService.remove(id);
    }
}
