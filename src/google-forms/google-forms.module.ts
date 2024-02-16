import { GoogleFormsService } from './google-forms.service';
import { CommonModule } from '../common/common.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [CommonModule],
  controllers: [],
  providers: [GoogleFormsService],
  exports: [GoogleFormsService],
})
export class GoogleFormsModule {}
