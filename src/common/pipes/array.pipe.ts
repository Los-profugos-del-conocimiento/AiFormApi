import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { isArray } from 'class-validator';

@Injectable()
export class ValidateArrayPipe implements PipeTransform {
    transform(value: any, metadata: ArgumentMetadata) {
        if (!isArray(value))
            throw new BadRequestException('Validation failed: Expected an array');
        
        return value;
    }
}
