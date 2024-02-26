import { 
    Controller, Get, Post, Body, Patch, Param, Delete,
    InternalServerErrorException 
} from '@nestjs/common';
import { ShortUuidPipe } from '../common/pipes/short-uuid.pipe';
import { ChatGptService } from '../chat-gpt/chat-gpt.service';
import { FormResponse } from '../chat-gpt/chat-gpt.interface';
import { CreateFormDto } from './dto/create-form.dto';
import { UpdateFormDto } from './dto/update-form.dto';
import { Form } from './entities/form.entity';
import { FormService } from './form.service';
import { FormPrompt } from './form.pipe';

@Controller('form')
export class FormController {
    constructor(
        private readonly formService: FormService,
        private readonly chatGptService: ChatGptService
    ) {}

    @Post()
    async create(@Body(FormPrompt) createFormDto: CreateFormDto) {
        const { questions }: FormResponse = await this.chatGptService.generateForm(createFormDto.completions);

        if (!questions) 
            throw new InternalServerErrorException('Failed to generate form questions. Please try again.');

        delete createFormDto.completions;
        
        return this.formService.create({ ...createFormDto, items: questions } as Form);
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
        // toDo: update form
        // return this.formService.update(id, updateFormDto);
    }

    @Delete(':id')
    remove(@Param('id', ShortUuidPipe) id: string) {
        return this.formService.remove(id);
    }
}
