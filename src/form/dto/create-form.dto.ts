import { 
    IsString, IsInt, IsEnum, IsOptional, IsArray,
    MinLength, Min, ValidateNested, ArrayMinSize
} from 'class-validator';
import { CreateItemDto } from '../../item/dto/create-item.dto';
import { AnswerType } from '../../answer/answer.enum';
import { Type as IType } from '../form.enum';
import { Type } from 'class-transformer';

export class CreateFormDto {
    @IsString()
    @IsEnum(IType)
    readonly type: string;

    @IsString()
    @IsOptional()
    @MinLength(5)
    readonly title: string;

    @IsString()
    @MinLength(5)
    readonly prompt: string;

    @IsInt()
    @Min(1)
    readonly questions: number;

    @IsString({ each: true })
    @IsEnum(AnswerType, { each: true })
    @IsOptional()
    @IsArray()
    readonly answerTypes: string[];

    @IsInt()
    @IsOptional()
    @IsEnum([1, 2, 3, 4, 5])
    readonly difficulty: number;

    @ValidateNested({ each: true })
    @Type(() => CreateItemDto)
    @IsArray()
    @ArrayMinSize(1)
    items: CreateItemDto[];
}
