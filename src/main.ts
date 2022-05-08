import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';

import { TransformInterceptor } from '@common/interceptors';
import { HttpExceptionFilter } from '@common/exceptions';

import { AppModule } from '@app/app.module';

import { config } from '@swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({ transform: true, skipMissingProperties: false }),
  );
  app.useGlobalInterceptors(
    new TransformInterceptor(),
    new ClassSerializerInterceptor(app.get(Reflector)),
  );
  app.useGlobalFilters(new HttpExceptionFilter());
  const { PORT = 3000 } = process.env;
  const swaggerDocument = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/v1', app, swaggerDocument);
  app.enableCors();
  await app.listen(PORT);
}
bootstrap();
