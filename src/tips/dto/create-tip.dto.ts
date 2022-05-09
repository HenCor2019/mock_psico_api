import { NotDuplicates } from '@common/decorators';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';

export class CreateTipDto {
  @ApiProperty({
    name: 'description',
    example: 'This is my bad tip',
    description: 'The description of the tip',
  })
  @IsString({})
  @Length(0, 150)
  description: string;

  @ApiProperty({
    name: 'categories',
    example: ['Alcohol', 'LSD'],
    description: 'The categories for the tip',
  })
  @IsString({ each: true })
  @NotDuplicates()
  categories: string[];
}