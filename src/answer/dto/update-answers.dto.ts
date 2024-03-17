import { IsArray, ValidateNested } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { Type } from 'class-transformer';
import { UpdateAnswerDto } from '.';

export class UpdateAnswersDto {
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => UpdateAnswerDto)
    answers: UpdateAnswerDto[];
}
