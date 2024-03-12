import { CreateAnswerDto } from './create-answer.dto';
import { PartialType } from '@nestjs/mapped-types';
import { IsString } from 'class-validator';

export class UpdateAnswerDto extends PartialType(CreateAnswerDto) {
    @IsString()
    id: string;    
}
