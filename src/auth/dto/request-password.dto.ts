import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class RequestPasswordDto {
  @ApiProperty({
    name: 'email',
    example: 'henry200amaya@gmail.com',
    description: 'The user email to recover password',
  })
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
