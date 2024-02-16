import { Module } from '@nestjs/common';
import { FormModule } from './form/form.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Form } from './form/entities/form.entity';
import { CommonModule } from './common/common.module';
import { GoogleFormsModule } from './google-forms/google-forms.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'aiform.sqlite',
      entities: [__dirname + '/**/*.entity.{ts,js}'],
      synchronize: true,
    }),
    FormModule,
    CommonModule,
    GoogleFormsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
