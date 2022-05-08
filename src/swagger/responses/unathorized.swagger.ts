import { ApiProperty } from '@nestjs/swagger';
import { BadRequestSwagger } from './bad-request.swagger';

export class UnauthorizedResponseSwagger extends BadRequestSwagger {
  constructor() {
    super();
  }

  @ApiProperty({
    name: 'messages',
    example: ['Unauthorized'],
    description: 'Invalid resource',
  })
  messages: string[];
}
