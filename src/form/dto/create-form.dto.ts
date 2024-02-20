import { 
    IsString, IsInt, IsEnum, IsOptional, IsArray,
    MinLength, Min, ValidateNested, ArrayMinSize
} from 'class-validator';
import { Type as IType, ResponseType } from '../form.enum';
import { Type } from 'class-transformer';
import { ItemDto } from './item.dto';

export class CreateFormDto {
    @IsString()
    @IsEnum(IType)
    readonly type: string;

    @IsString()
    @MinLength(5)
    readonly title: string;

    @IsString()
    @MinLength(5)
    readonly prompt: string;

    @IsInt()
    @Min(1)
    readonly questions: number;

    @IsString({ each: true })
    @IsEnum(ResponseType, { each: true })
    @IsOptional()
    @IsArray()
    readonly answerTypes: string[];

    @IsInt()
    @IsEnum([1, 2, 3, 4, 5])
    readonly difficulty: number;

    @ValidateNested({ each: true })
    @Type(() => ItemDto)
    @IsArray()
    @ArrayMinSize(1)
    items: ItemDto[];
}
