import { ExceptionFilter, Catch, ArgumentsHost, BadRequestException } from '@nestjs/common';
import { ValidationError } from 'class-validator';

@Catch(ValidationError)
export class ValidationExceptionFilter implements ExceptionFilter {
    catch(exception: ValidationError, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        let errorObj = [];

        if (exception.constraints) errorObj.push(exception.constraints);
        if (exception.children && exception.children.length > 0) {
            exception.children.forEach(childError =>
                errorObj.push({
                    property: childError.property,
                    children: childError.children.map((child: ValidationError) => child.constraints)
                })
            );
        }

        response.status(400).json({
            message: 'Validation failed xd',
            errors: errorObj,
            error: 'Bad Request',
            statusCode: 400,
        });
    }
}
 