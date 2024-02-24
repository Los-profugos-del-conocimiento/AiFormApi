import { Item } from '../../item/entities/item.entity';
import { CreateAnswerDto } from './create-answer.dto';
import { IsOptional } from 'class-validator';

export class CreateAnswerCascadeDto extends CreateAnswerDto {
    @IsOptional()
    readonly item: Item;
}
