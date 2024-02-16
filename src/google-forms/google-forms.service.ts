import { AxiosAdapter } from '../common/adapters/axios.adapter';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GoogleFormsService {
    private readonly baseUrl: string = 'https://forms.googleapis.com/v1/forms/';
    private readonly token: string = 'YOUR_GOOGLE_API_TOKEN';

    constructor (
        private readonly http: AxiosAdapter
    ) {}

    async create (form: any): Promise<any> {
        return await this.http.post(this.baseUrl, form, {
            headers: {
                Authorization: `Bearer ${this.token}`
            }
        });
    }

    async batchUpdate (formId: string, form: any): Promise<any> {
        return await this.http.post(`${this.baseUrl}${formId}:batchUpdate`, form, {
            headers: {
                Authorization: `Bearer ${this.token}`
            }
        });
    }
}
