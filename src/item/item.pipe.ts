import { validateCreateAnswer, validateUpdateAnswer } from '../answer/answer.utils';
import { CreateItemsDto, UpdateItemsDto } from '../item/dto';
import { PipeTransform, Injectable } from '@nestjs/common';
import { AnswerService } from '../answer/answer.service';
import { FormService } from '../form/form.service';
import { ItemService } from './item.service';

@Injectable()
export class ItemMutationPipe implements PipeTransform {
    constructor(
        private readonly itemService: ItemService,
        private readonly formService: FormService,
        private readonly answerService: AnswerService
    ) {}

    async transform(dto: CreateItemsDto | UpdateItemsDto) {
        const itemCache = new Map<string, any>();

        const answers = await dto.items.reduce(async (accPromise, item) => {
            const accumulatedItems = await accPromise;

            if ('form' in item) {
                const formId = item.form as unknown as string;

                if (!itemCache.has(formId))
                    itemCache.set(formId, this.formService.findOne(formId));
            
                item.form = await itemCache.get(formId);
                // accumulatedItems.push(validateCreateAnswer(answer));
            } else if ('id' in item) {
                const itemId = item.id;
                const itemEntity = await this.itemService.findOne(itemId, ['form']);
                // accumulatedAnswers.push(validateUpdateAnswer(answerEntity, answer));
            }

            return accumulatedItems;
        }, Promise.resolve([]));

        return { answers };
    }
}
