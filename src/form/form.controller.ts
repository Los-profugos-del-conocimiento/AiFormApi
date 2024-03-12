import { 
    Controller, Get, Post, Body, Patch, Param, Delete,
    InternalServerErrorException, UseGuards, Req
} from '@nestjs/common';
import { ShortUuidPipe } from '../common/pipes/short-uuid.pipe';
import { ChatGptService } from '../chat-gpt/chat-gpt.service';
import { FormResponse } from '../chat-gpt/chat-gpt.interface';
import { CreateFormDto } from './dto/create-form.dto';
import { UpdateFormDto } from './dto/update-form.dto';
import { Form } from './entities/form.entity';
import { FormService } from './form.service';
import { AuthGuard } from '@nestjs/passport';
import { FormPrompt } from './form.pipe';
import { Request } from 'express';

@Controller('form')
export class FormController {
    constructor(
        private readonly formService: FormService,
        private readonly chatGptService: ChatGptService
    ) {}

    @Post()
    @UseGuards(AuthGuard('jwt'))
    async create(
        @Body(FormPrompt) createFormDto: CreateFormDto,
        @Req() request: Request
    ) {
        const { questions }: FormResponse = await this.chatGptService.generateForm(createFormDto.completions);

        if (!questions) 
            throw new InternalServerErrorException('Failed to generate form questions. Please try again.');

        delete createFormDto.completions;
        
        return await this.formService.create({ ...createFormDto, items: questions, user: request.user } as Form);
    }

    @Get()
    @UseGuards(AuthGuard('jwt'))
    async getFormsByUser(
        @Req() request: Request
    ) {
        return this.formService.findByUser(request.user.id);
    }

    @Get(':id')
    @UseGuards(AuthGuard('jwt'))
    // toDo: validate if the user has access to the form
    findOne(@Param('id', ShortUuidPipe) id: string) {
        return this.formService.findOne(id);
    }

    @Patch(':id')
    @UseGuards(AuthGuard('jwt'))
    update(
        @Param('id', ShortUuidPipe) id: string, 
        @Body() updateFormDto: UpdateFormDto
    ) {
        // toDo: update form
        // return this.formService.update(id, updateFormDto);
    }

    @Delete(':id')
    @UseGuards(AuthGuard('jwt'))
    async remove(@Param('id', ShortUuidPipe) id: string) {
        const formDeleted = await this.formService.remove(id);
        return { message: 'Form removed.', formDeleted }
    }
}
