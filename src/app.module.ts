import { Module } from '@nestjs/common';
import { FormModule } from './form/form.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Form } from './form/entities/form.entity';
import { CommonModule } from './common/common.module';

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
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
