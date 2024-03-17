import { UpdateAnswerDto, CreateAnswerDto } from './dto';
import { BadRequestException } from '@nestjs/common';
import { Item } from '../item/entities/item.entity';
import { Answer } from './entities/answer.entity';

function checkFormAndAnswerType(item: Item): boolean {
    return item.form.type === 'quiz' &&
        ['radio', 'checkbox', 'drop_down', 'text'].includes(item.answerType);
}

function validateCorrectField(correct: boolean | undefined | null, action: 'create' | 'update'): void {
    const message = {
        create: 'Correct field is required for quiz type forms.',
        update: 'Correct field cannot be null for quiz type forms.'
    };

    if (correct === undefined || correct === null)
        throw new BadRequestException(message[action]);
}

export function validateCreateAnswer(answer: CreateAnswerDto): CreateAnswerDto {
    if (checkFormAndAnswerType(answer.item))
        validateCorrectField(answer.correct, 'create');
    else delete answer.correct;

    return answer;
}

export function validateUpdateAnswer(answer: Answer, updateAnswerDto: UpdateAnswerDto): Answer {
    if (checkFormAndAnswerType(answer.item)) {
        if (updateAnswerDto.hasOwnProperty('correct'))
            validateCorrectField(updateAnswerDto.correct, 'update');
    } else delete updateAnswerDto.correct;

    if (Object.keys(updateAnswerDto).length < 2)
        throw new BadRequestException(`At least one field is required to update answer: ${answer.id}.`);

    Object.assign(answer, updateAnswerDto);

    return answer;
}