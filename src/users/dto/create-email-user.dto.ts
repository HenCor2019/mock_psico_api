import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateEmailUserDto {
  @ApiProperty({
    name: 'content',
    example: 'Hello, Iam a boy with 15 years old',
    description: 'The content of email',
  })
  @IsNotEmpty()
  @IsString()
  content: string;
}
