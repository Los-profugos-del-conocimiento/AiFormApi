import { Form, BatchUpdate, BatchUpdateResponse } from './interfaces';
import { AxiosAdapter } from '../common/adapters/axios.adapter';
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
        return await this.http.post(url, data, { headers });
    }

    async create(form: Form): Promise<Form> {
        return await this.executeRequest(this.baseUrl, form);
    }

    async batchUpdate(formId: string, body: BatchUpdate): Promise<BatchUpdateResponse> {
        return await this.executeRequest(`${this.baseUrl}${formId}:batchUpdate`, body);
    }
}
