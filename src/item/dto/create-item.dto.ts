import { IsArray, IsEnum, IsOptional, IsString, IsNotEmpty, ValidateNested } from 'class-validator';
import { CreateAnswerCascadeDto } from '../../answer/dto';
import { Form } from '../../form/entities/form.entity';
import { AnswerType } from '../../answer/answer.enum';
import { Type } from 'class-transformer';

export class CreateItemDto {
    @IsString()
    readonly question: string;

    @IsString()
    @IsOptional()
    readonly description?: string;

    @IsString()
    @IsEnum(AnswerType)
    readonly answerType: string;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateAnswerCascadeDto)
    readonly answers: CreateAnswerCascadeDto[];

    @Type(() => Form)
    @IsNotEmpty()
    form: Form;
}
