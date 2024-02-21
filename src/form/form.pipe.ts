import { 
    PromptRules, QuizRules, SurveyRules, DifficultyRules, QuestionRules, AnswerRules, ResponseRules 
} from './form.rules';
import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';
import { CreateFormDto } from '../form/dto/create-form.dto';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';

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
        // console.log({ completions });
        value.completions = completions;

        return value;
    }

    private toValidate(metatype: any): boolean {
        const types = [String, Boolean, Number, Array, Object];
        return !types.includes(metatype);
    }
}
