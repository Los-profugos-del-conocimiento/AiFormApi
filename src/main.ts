import { ValidationExceptionFilter } from './common/filters/validation-exception.filter';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.useGlobalPipes(new ValidationPipe({
        whitelist: true, // remueve propiedades que no estén definidas en el DTO
        forbidNonWhitelisted: true, // lanza un error cuando se envia propiedades no definidas en el DTO
    }));
    app.useGlobalFilters(new ValidationExceptionFilter());

    await app.listen(3000);
}
bootstrap();
