import { 
    IsString, IsInt, IsEnum, IsOptional, IsArray,
    MinLength, Min 
} from 'class-validator';
import { Type, ResponseType } from '../form.enum';

export class CreateFormDto {
    @IsString()
    @MinLength(5)
    readonly prompt: string;

    @IsString()
    @IsEnum(Type)
    readonly type: string;

    @IsInt()
    @Min(1)
    readonly questions: number;

    @IsString({ each: true })
    @IsEnum(ResponseType, { each: true })
    @IsOptional()
    @IsArray()
    readonly responseType: string[];

    @IsInt()
    @IsEnum([1, 2, 3, 4, 5])
    readonly difficulty: number;
}
