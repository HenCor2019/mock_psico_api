import { DocumentBuilder } from '@nestjs/swagger';

export const config = new DocumentBuilder()
  .setTitle('Hiripi')
  .setDescription('The api to manage every hire internal process')
  .setVersion('1.0.0')
  .addBearerAuth()
  .build();
