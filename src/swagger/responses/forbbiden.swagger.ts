import { ApiProperty } from '@nestjs/swagger';
import { BadRequestSwagger } from './bad-request.swagger';

export class ForbbidenResponseSwagger extends BadRequestSwagger {
  constructor() {
    super();
  }

  @ApiProperty({
    name: 'messages',
    example: ['Forbbiden resource'],
    description: 'Invalid resource',
  })
  messages: string[];
}
