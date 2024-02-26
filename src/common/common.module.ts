import { GoogleFormsAdapter } from './adapters/google-forms.adapter';
import { AxiosAdapter } from './adapters/axios.adapter';
import { Module } from '@nestjs/common';

@Module({
    providers: [AxiosAdapter, GoogleFormsAdapter],
    exports: [AxiosAdapter, GoogleFormsAdapter],
})
export class CommonModule {}
