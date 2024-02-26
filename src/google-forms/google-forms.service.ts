import { Form, BatchUpdate, BatchUpdateResponse } from './interfaces';
import { AxiosAdapter } from '../common/adapters/axios.adapter';
import { Form as FormEntity } from '../form/entities/form.entity';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GoogleFormsService {
    private readonly baseUrl: string = 'https://forms.googleapis.com/v1/forms/';
    private readonly token: string;

    constructor (
        private readonly http: AxiosAdapter,
        private readonly configService: ConfigService
    ) {
        this.token = this.configService.get('GOOGLE_API_TOKEN');
    }

    private async executeRequest(url: string, data: Form | BatchUpdate): Promise<any> {
        const headers = { Authorization: `Bearer ${this.token}` };
        return await this.http.post(url, data, { headers })
            .catch((error) => { 
                console.log('error1', error); 
                throw new Error('Failed to create Google Form')
            });
    }

    async create(form: Form): Promise<Form> {
        const googleForm: Form = await this.executeRequest(this.baseUrl, form);

        if (!googleForm.formId) throw new Error('Google Form not created.');

        return googleForm;
    }

    async batchUpdate(formId: string, body: BatchUpdate): Promise<BatchUpdateResponse> {
        return await this.executeRequest(`${this.baseUrl}${formId}:batchUpdate`, body);
    }
}
