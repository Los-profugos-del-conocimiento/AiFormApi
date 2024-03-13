import { BadRequestException } from '@nestjs/common';
import { Answer } from './entities/answer.entity';


export function validateAnswer(answer: Answer): Answer {
    const formType = answer.item?.form?.type;
    const answerType = answer.item?.answerType;

    if (formType === 'quiz' && ['radio', 'checkbox', 'drop_down', 'text'].includes(answerType)) {
        if (answer.correct === undefined || answer.correct === null) 
            throw new BadRequestException('Correct field is required for quiz type forms');
    } else delete answer.correct;

    Object.assign(answer, answer);

    return answer;
}
