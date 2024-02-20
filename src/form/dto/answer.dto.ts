import { IsString, IsBoolean, IsOptional } from 'class-validator';

export class AnswerDto {
    @IsString()
    readonly answerId: string;

    @IsString()
    readonly text: string;

    @IsOptional()
    @IsBoolean()
    readonly correct?: boolean;
}
