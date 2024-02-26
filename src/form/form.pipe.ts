import { 
    PromptRules, QuizRules, SurveyRules, DifficultyRules, QuestionRules, AnswerRules, ResponseRules 
} from './form.rules';
import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { CreateFormDto } from '../form/dto/create-form.dto';
import { FormService } from './form.service';

@Injectable()
export class FormPrompt implements PipeTransform<any> {
    async transform(createFormDto: CreateFormDto, metadata: ArgumentMetadata) {
        const completions = [
            ...PromptRules(createFormDto.prompt),
            ...(createFormDto.type === 'quiz' ? QuizRules : SurveyRules),
            ...((createFormDto.type === 'quiz' && createFormDto.difficulty) && DifficultyRules(createFormDto.difficulty)),
            ...QuestionRules(createFormDto.questions),
            ...AnswerRules(createFormDto.answerTypes, true),
            ...ResponseRules
        ]

        createFormDto.completions = completions;

        // toDo: generate a title with IA if not provided
        if (!createFormDto.title) createFormDto.title = 'Untitled';

        return createFormDto;
    }

    private toValidate(metatype: any): boolean {
        const types = [String, Boolean, Number, Array, Object];
        return !types.includes(metatype);
    }
}

@Injectable()
export class FormValidationPipe implements PipeTransform {
    constructor(
        private readonly formService: FormService
    ) {}

    async transform(values: any, metadata: ArgumentMetadata) {
        for (const value of values) {
            const formEntity = await this.formService.findOne(value.form);
            if (!formEntity) throw new BadRequestException(`Form with ID ${value.id} not found`);
        }

        return values;
    }
}

