import { IsString, IsOptional, IsBoolean } from 'class-validator';

export class UpdateAnswerDto {
    @IsString()
    id: string;

    @IsOptional()
    @IsString()
    readonly text?: string;

    @IsOptional()
    @IsBoolean()
    correct?: boolean;
}
