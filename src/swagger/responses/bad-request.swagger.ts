import { ApiProperty } from '@nestjs/swagger';

export class BadRequestSwagger {
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
    example: ['empty parameter'],
    description: 'The messages',
  })
  messages: string[];
}
