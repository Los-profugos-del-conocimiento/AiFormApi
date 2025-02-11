import { IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { UpdateItemDto } from '.';

export class UpdateItemsDto {
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => UpdateItemDto)
    items: UpdateItemDto[];
}
