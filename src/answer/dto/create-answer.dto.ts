import { IsString, IsBoolean, IsOptional, IsNotEmpty } from 'class-validator';
import { Item } from '../../item/entities/item.entity';
import { Type } from 'class-transformer';

export class CreateAnswerDto {
    @IsString()
    @IsOptional()
    readonly answerId?: string;

    @IsString()
    readonly text: string;

    @IsOptional()
    @IsBoolean()
    correct?: boolean;

    @Type(() => Item)
    @IsNotEmpty()
    readonly item: Item;
}
