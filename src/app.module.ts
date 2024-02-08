import { Module } from '@nestjs/common';
import { FormModule } from './form/form.module';
import { UserModule } from './user/user.module';
import { FilesModule } from './files/files.module';

@Module({
  imports: [FormModule, UserModule, FilesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
