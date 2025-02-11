import { 
    PromptRules, QuizRules, SurveyRules, DifficultyRules, QuestionRules, AnswerRules, ResponseRules 
} from './form.rules';
import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { CreateFormDto } from '../form/dto/create-form.dto';
import { FormService } from './form.service';

@Injectable()
export class FormPrompt implements PipeTransform<any> {
    transform(createFormDto: CreateFormDto, metadata: ArgumentMetadata) {
        console.log('metadata', metadata)
        const isQuiz = createFormDto.type === 'quiz';

        createFormDto.completions = [
            ...PromptRules(createFormDto.prompt),
            ...(isQuiz ? QuizRules : SurveyRules),
            ...((isQuiz && createFormDto.difficulty) ? DifficultyRules(createFormDto.difficulty) : []),
            ...QuestionRules(createFormDto.questions),
            ...AnswerRules(createFormDto.answerTypes, isQuiz),
            ...ResponseRules
        ]

        return createFormDto;
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

