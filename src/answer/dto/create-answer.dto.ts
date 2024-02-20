import { IsString, IsBoolean, IsOptional } from 'class-validator';

export class CreateAnswerDto {
    @IsString()
    @IsOptional()
    readonly answerId?: string;

    @IsString()
    readonly text: string;

    @IsOptional()
    @IsBoolean()
    readonly correct?: boolean;
}
