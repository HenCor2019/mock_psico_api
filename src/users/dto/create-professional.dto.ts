import { NotDuplicates } from '@common/decorators';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { ArrayMinSize, IsArray, IsNotEmpty, IsString } from 'class-validator';

export class CreateProfessionalDto {
  @ApiProperty({
    name: 'specialities',
    example: [1, 2],
    description: 'The specialities for the professinal',
  })
  @IsNotEmpty()
  @IsArray({ message: 'Invalid format for specialities' })
  @ArrayMinSize(1, { message: 'Include at least one speciality' })
  @IsString({ each: true })
  @Transform((param) => param.value?.split(',') ?? [])
  @NotDuplicates()
  specialities: number[];

  @ApiProperty({
    name: 'professionalSlogan',
    example: [1, 2],
    description: 'The principal message',
  })
  @IsNotEmpty()
  @IsString()
  professionalSlogan: string;
}
