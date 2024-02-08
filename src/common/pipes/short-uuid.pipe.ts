import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ShortUuidPipe implements PipeTransform {
    transform(value: any, metadata: ArgumentMetadata) {
        if (!this.isShortUuid(value))
            throw new BadRequestException('The ID is not a valid short UUID');

        return value;
    }

    private isShortUuid(value: any): boolean {
        return typeof value === 'string' && value.length === 8;
    }
}
