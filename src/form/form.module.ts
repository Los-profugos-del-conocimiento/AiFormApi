import { GoogleFormsModule } from '../google-forms/google-forms.module';
import { FormController } from './form.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Form } from './entities/form.entity';
import { FormService } from './form.service';
import { Module } from '@nestjs/common';

@Module({
  controllers: [FormController],
  providers: [FormService],
  imports: [TypeOrmModule.forFeature([Form]), GoogleFormsModule],
})
export class FormModule {}
