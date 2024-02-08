import { IsString, IsInt, IsEnum, MinLength, Min } from 'class-validator';


export class CreateFormDTO {
    @IsString()
    @MinLength(5)
    readonly prompt: string;

    @IsString()
    @IsEnum(['survey', 'quiz'])
    readonly type: string;

    @IsInt()
    @Min(1)
    readonly questions: number;

    @IsString()
    @IsEnum(['multiple', 'single', 'boolean', 'text']) // this depends on limitation of google forms API
    readonly responseType: string;

    @IsInt()
    @IsEnum([1, 2, 3, 4, 5])
    readonly difficulty: number;
}
