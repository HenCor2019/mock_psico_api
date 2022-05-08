import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    name: 'fullname',
    example: 'Katya Lopez',
    description: 'The fullname of the user',
  })
  @IsString({})
  @Length(0, 50)
  fullname: string;

  @ApiProperty({
    name: 'email',
    example: '00095119@uca.edu.sv',
    description: 'The email of the user',
  })
  @IsString()
  @IsEmail()
  @Length(0, 50)
  email: string;

  @ApiProperty({
    name: 'password',
    example: '123Admin',
    description: 'The password of the user',
  })
  @IsString()
  @Length(0, 50)
  password: string;
}