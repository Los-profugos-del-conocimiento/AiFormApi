import { 
    IsString, IsInt, IsEnum, IsOptional, IsArray,
    MinLength, Min, ValidateNested, ArrayMinSize
} from 'class-validator';
import { Completions } from '../../chat-gpt/chat-gpt.interface';
import { CreateItemDto } from '../../item/dto/create-item.dto';
import { Type as IType, Difficulty } from '../form.enum';
import { AnswerType } from '../../answer/answer.enum';
import { Type } from 'class-transformer';

export class CreateFormDto {
    @IsString()
    @IsEnum(IType)
    readonly type: string;

    @IsString()
    @IsOptional()
    @MinLength(5)
    title: string;

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
    readonly answerTypes?: string[];

    @IsInt()
    @IsOptional()
    @IsEnum(Difficulty)
    readonly difficulty: number;

    completions?: Completions
}
