import { Controller, Post, Param } from '@nestjs/common';
import { GoogleFormsService } from './google-forms.service';
import { FormService } from '../form/form.service';
import { ShortUuidPipe } from '../common/pipes/short-uuid.pipe';

@Controller('google-forms')
export class GoogleFormsController {
    constructor(
        private readonly googleFormsService: GoogleFormsService,
        private readonly formService: FormService
    ) {}

    @Post('generate/:formId')
    generateForm(@Param('formId', ShortUuidPipe) formId: string) {
        console.log('formId', formId);
        return {}
    }
}