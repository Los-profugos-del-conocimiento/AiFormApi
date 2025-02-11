import { 
    Controller, Get, Post, Body, Patch, Param, Delete,
    InternalServerErrorException, UseGuards, Req
} from '@nestjs/common';
import { ShortUuidPipe } from '../common/pipes/short-uuid.pipe';
import { ChatGptService } from '../chat-gpt/chat-gpt.service';
import { FormResponse } from '../chat-gpt/chat-gpt.interface';
import { CreateFormDto } from './dto/create-form.dto';
import { UpdateFormDto } from './dto/update-form.dto';
import { PromptRules, TitleRules } from './form.rules'
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
        @Req() request: Request,
        @Body(FormPrompt) createFormDto: CreateFormDto,
    ) {
        const { questions }: FormResponse = await this.chatGptService.generateForm(createFormDto.completions);

        console.log('questions', questions);
        if (!questions) 
            throw new InternalServerErrorException('Failed to generate form questions. Please try again.');

        delete createFormDto.completions;
        
        const isAutoTitle: boolean = !createFormDto.title;
        if (isAutoTitle)
            createFormDto.title = 
                await this.chatGptService.generateTitle([ ...TitleRules, ...PromptRules(createFormDto.prompt)]);

        console.log('createFormDto.title', createFormDto.title);
        return await this.formService.create(
            { ...createFormDto, isAutoTitle, items: questions, user: request.user } as Form
        );
    }

    @Get()
    @UseGuards(AuthGuard('jwt'))
    async getFormsByUser(
        @Req() request: Request,
    ) {
        return this.formService.findByUser(request.user.id);
    }

    @Get(':id')
    @UseGuards(AuthGuard('jwt'))
    findOne(
        @Req() request: Request,
        @Param('id', ShortUuidPipe) id: string
    ) {
        return this.formService.findOne(id, request.user.id);
    }

    @Patch(':id')
    @UseGuards(AuthGuard('jwt'))
    async update(
        @Req() request: Request,
        @Param('id', ShortUuidPipe) id: string, 
        @Body(FormPrompt) updateFormDto: UpdateFormDto
    ) {
        const existingForm = await this.formService.findOne(id, request.user.id);

        const { questions }: FormResponse = await this.chatGptService.generateForm(updateFormDto.completions);

        if (!questions)
            throw new InternalServerErrorException('Failed to generate form questions. Please try again.');

        delete updateFormDto.completions;

        // Actualizar el formulario con las nuevas preguntas generadas
        await this.formService.update(id, { ...existingForm, ...updateFormDto, items: questions });

        return { message: 'Form updated successfully' };
    }

    @Delete(':id')
    @UseGuards(AuthGuard('jwt'))
    async remove(
        @Req() request: Request,
        @Param('id', ShortUuidPipe) id: string
    ) {
        const formDeleted = await this.formService.remove(id, request.user.id);
        return { message: 'Form removed.', formDeleted }
    }
}
