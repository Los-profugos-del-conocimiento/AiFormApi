import { IsArray, IsEnum, IsOptional, IsString, ValidateNested } from 'class-validator';
import { CreateAnswerDto } from '../../answer/dto/create-answer.dto';
import { AnswerType } from '../../answer/answer.enum';
import { Type } from 'class-transformer';

export class CreateItemDto {
    @IsString()
    @IsOptional()
    readonly itemId?: string;

    @IsString()
    readonly question: string;

    @IsString()
    @IsOptional()
    readonly description?: string;

    @IsString()
    @IsEnum(AnswerType)
    readonly answerType: string;

    @ValidateNested({ each: true })
    @Type(() => CreateAnswerDto)
    @IsArray()
    answers: CreateAnswerDto[];
}
