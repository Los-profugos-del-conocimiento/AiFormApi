import { IsString, IsInt, IsEnum } from 'class-validator';


export class FormDTO {
    @IsString()
    readonly prompt: string;

    @IsString()
    @IsEnum(['survey', 'quiz'])
    readonly type: string;

    @IsInt()
    readonly questions: number;

    @IsString()
    @IsEnum(['multiple', 'single', 'boolean', 'text']) // this depends on limitation of google forms API
    readonly responseType: string;

    @IsInt()
    @IsEnum([1, 2, 3, 4, 5])
    readonly difficulty: number;
}
