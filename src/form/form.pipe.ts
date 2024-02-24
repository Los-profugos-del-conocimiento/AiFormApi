import { 
    PromptRules, QuizRules, SurveyRules, DifficultyRules, QuestionRules, AnswerRules, ResponseRules 
} from './form.rules';
import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { CreateFormDto } from '../form/dto/create-form.dto';
import { FormService } from './form.service';

// change the name of the pipe
@Injectable()
export class ValidationPipe implements PipeTransform<any> {
    async transform(value: CreateFormDto, metadata: ArgumentMetadata) {
        const completions = [
            ...PromptRules(value.prompt),
            ...(value.type === 'quiz' ? QuizRules : SurveyRules),
            ...((value.type === 'quiz' && value.difficulty) && DifficultyRules(value.difficulty)),
            ...QuestionRules(value.questions),
            ...AnswerRules(value.answerTypes, true),
            ...ResponseRules
        ]
        
        value.completions = completions;

        // toDo: generate a title with IA if not provided
        if (!value.title) value.title = 'Untitled';

        return value;
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

