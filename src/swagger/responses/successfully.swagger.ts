import { ApiProperty } from '@nestjs/swagger';

export class SuccesfullyResponse {
  @ApiProperty({
    name: 'success',
    example: true,
    description: 'Indicate request response',
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
    example: [],
    description: 'The messages',
  })
  messages: string[];
}
