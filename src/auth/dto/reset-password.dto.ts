import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class ResetPasswordDto {
  @ApiProperty({
    name: 'password',
    example: 'gambito123',
    description: 'The new password',
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}
