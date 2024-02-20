import { IsArray, IsEnum, IsOptional, IsString, ValidateNested } from 'class-validator';
import { ResponseType } from '../form.enum';
import { Type } from 'class-transformer';
import { AnswerDto } from './answer.dto';


export class ItemDto {
    @IsString()
    readonly itemId: string;

    @IsString()
    readonly question: string;

    @IsString()
    @IsOptional()
    readonly description?: string;

    @IsString()
    @IsEnum(ResponseType)
    readonly answerType: string;

    @ValidateNested({ each: true })
    @Type(() => AnswerDto)
    @IsArray()
    answers: AnswerDto[];
}
