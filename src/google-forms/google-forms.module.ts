import { GoogleFormsController } from './google-forms.controller';
import { GoogleFormsService } from './google-forms.service';
import { CommonModule } from '../common/common.module';
import { FormModule } from '../form/form.module';
import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';

@Module({
    imports: [CommonModule, FormModule, ConfigModule],
    controllers: [GoogleFormsController],
    providers: [GoogleFormsService],
    exports: [GoogleFormsService],
})
export class GoogleFormsModule {}
