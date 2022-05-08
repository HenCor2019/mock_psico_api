import { DocumentBuilder } from '@nestjs/swagger';

export const config = new DocumentBuilder()
  .setTitle('Psico amigos')
  .setDescription('The pre api to manage psico amigos app')
  .setVersion('1.0.0')
  .addBearerAuth()
  .build();
