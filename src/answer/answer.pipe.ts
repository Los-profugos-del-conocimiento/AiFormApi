import { validateCreateAnswer, validateUpdateAnswer } from './answer.utils';
import { CreateAnswersDto, UpdateAnswersDto } from './dto';
import { PipeTransform, Injectable } from '@nestjs/common';
import { ItemService } from '../item/item.service';
import { AnswerService } from './answer.service';

@Injectable()
export class AnswerMutationPipe implements PipeTransform {
    constructor(
        private readonly itemService: ItemService,
        private readonly answerService: AnswerService
    ) {}

    async transform(dto: CreateAnswersDto | UpdateAnswersDto) {
        const itemCache = new Map<string, any>();

        const answers = await dto.answers.reduce(async (accPromise, answer) => {
            const accumulatedAnswers = await accPromise;

            if ('item' in answer) {
                const itemId = answer.item as unknown as string;

                if (!itemCache.has(itemId))
                    itemCache.set(itemId, this.itemService.findOne(itemId));
            
                answer.item = await itemCache.get(itemId);
                accumulatedAnswers.push(validateCreateAnswer(answer));
            } else if ('id' in answer) {
                const answerId = answer.id;
                const answerEntity = await this.answerService.findOne(answerId, ['item', 'item.form']);
                accumulatedAnswers.push(validateUpdateAnswer(answerEntity, answer));
            }

            return accumulatedAnswers;
        }, Promise.resolve([]));

        return { answers };
    }
}
