import { ValidationExceptionFilter } from './common/filters/validation-exception.filter';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const configService: ConfigService = app.get(ConfigService);

    app.useGlobalPipes(new ValidationPipe({
        whitelist: true, // remueve propiedades que no estén definidas en el DTO
        forbidNonWhitelisted: true, // lanza un error cuando se envia propiedades no definidas en el DTO
    }));
    app.useGlobalFilters(new ValidationExceptionFilter());

    app.enableCors({
        origin: '*',
        methods: 'GET,PATCH,POST,DELETE',
        allowedHeaders: 'Content-Type',
    });

    await app.listen(configService.get<number>('port'));
    console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
