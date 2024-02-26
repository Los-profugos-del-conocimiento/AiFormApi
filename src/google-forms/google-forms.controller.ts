import { Controller, Post, Param, InternalServerErrorException } from '@nestjs/common';
import { Form as GoogleForm, BatchUpdate, Request, Question, Grading } from './interfaces';
import { GoogleFormsAdapter } from '../common/adapters/google-forms.adapter';
import { ShortUuidPipe } from '../common/pipes/short-uuid.pipe';
import { GoogleFormsService } from './google-forms.service';
import { Item } from '../item/entities/item.entity';
import { Form } from '../form/entities/form.entity';
import { FormService } from '../form/form.service';
import { ChoiceType } from './google-forms.enum';

@Controller('google-forms')
export class GoogleFormsController {
    constructor(
        private readonly googleFormsService: GoogleFormsService,
        private readonly formService: FormService,
        private readonly googleFormsAdapter: GoogleFormsAdapter
    ) {}

    @Post('generate/:formId')
    async generateForm(@Param('formId', ShortUuidPipe) formId: string) {
        // toDo: validate and return form from pipe
        const { type, title, items }: Form = await this.formService.findOne(formId);

        if (!items.length) throw new InternalServerErrorException('Form has no items');

        const createGoogleFormData: GoogleForm = { info: { title, documentTitle: title } };

        const googleForm: GoogleForm = await this.googleFormsService.create(createGoogleFormData)
            .catch(() => { throw new InternalServerErrorException('Failed to create Google Form') });
        // console.log('googleForm', googleForm);
        
        await this.formService.update(formId, { 
            googleFormId: googleForm.formId, 
            googleFormResponseUri: googleForm.responderUri
        });

        const updateGoogleFormData: BatchUpdate = 
            this.googleFormsAdapter.generateBatchUpdateRequest({ type, items }, googleForm.formId);

        const updatedGoogleForm = 
            await this.googleFormsService.batchUpdate(googleForm.formId, updateGoogleFormData)
                .catch(() => { throw new InternalServerErrorException('Failed to update Google Form') });
                // .catch((error) => {
                //     console.log('error', error); 
                //     throw new InternalServerErrorException('Failed to create Google Form') 
                // });

        console.log('updatedGoogleForm', JSON.stringify(updatedGoogleForm));
        // console.log('updatedGoogleForm', updatedGoogleForm);

        return googleForm;
    }
}
