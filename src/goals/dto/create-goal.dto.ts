import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsDate, IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateGoalDto {
  @ApiProperty({
    name: 'title',
    example: 'Dont drink bear',
    description: 'The goal title',
  })
  @IsNotEmpty()
  @IsString()
  @Length(0, 50)
  title: string;

  @ApiProperty({
    name: 'description',
    example: 'I not gonna drink bear for a week.',
    description: 'The goal description',
  })
  @IsNotEmpty()
  @IsString()
  @Length(0, 200)
  description: string;

  @ApiProperty({
    name: 'startDate',
    example: 'YYYY/MM/dd',
    description: 'The goal start date',
  })
  @IsNotEmpty()
  @IsDate()
  @Transform((params) => new Date(params.value))
  startDate: Date;

  @ApiProperty({
    name: 'finishDate',
    example: 'YYYY/MM/dd',
    description: 'The goal finish date',
  })
  @IsNotEmpty()
  @IsDate()
  @Transform((params) => new Date(params.value))
  finishDate: Date;
}
