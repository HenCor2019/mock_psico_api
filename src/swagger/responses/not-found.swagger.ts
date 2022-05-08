import { ApiProperty } from '@nestjs/swagger';

export class NotFoundSwagger {
  @ApiProperty({
    name: 'success',
    example: false,
    description: 'indicate request response',
  })
  success: boolean;

  @ApiProperty({
    name: 'content',
    example: null,
    description: 'content response',
  })
  content: object;

  @ApiProperty({
    name: 'messages',
    example: ['Resource not found'],
    description: 'The messages',
  })
  messages: string[];
}
