import { IsString, IsArray, IsOptional, ValidateNested } from 'class-validator';
import { CreateAnswerCascadeDto } from '../../answer/dto';
import { Type } from 'class-transformer';

export class UpdateItemDto {
    @IsString()
    id: string;

    @IsString()
    readonly question: string;

    @IsString()
    @IsOptional()
    readonly description?: string;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateAnswerCascadeDto)
    readonly answers: CreateAnswerCascadeDto[];
}
