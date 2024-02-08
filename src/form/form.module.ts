import { Module } from '@nestjs/common';
import { FormService } from './form.service';
import { Form } from './entities/form.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FormController } from './form.controller';

@Module({
  controllers: [FormController],
  providers: [FormService],
  imports: [TypeOrmModule.forFeature([Form])],
})
export class FormModule {}
