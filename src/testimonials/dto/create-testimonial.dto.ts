import { NotDuplicates } from '@common/decorators';
import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsString,
  Length,
} from 'class-validator';

export class CreateTestimonialDto {
  @ApiProperty({
    name: 'title',
    example: 'My experience with Alcohol',
    description: 'The testimonial title',
  })
  @IsNotEmpty()
  @IsString({})
  @Length(0, 50)
  title: string;

  @ApiProperty({
    name: 'description',
    example: 'This is my bad tip',
    description: 'The description of the testimonial',
  })
  @IsNotEmpty()
  @IsString({})
  @Length(0, 150)
  description: string;

  @ApiProperty({
    name: 'categories',
    example: ['Alcohol', 'LSD'],
    description: 'The categories for the testimonial',
  })
  @IsNotEmpty()
  @IsArray({ message: 'Invalid format for categories' })
  @ArrayMinSize(1, { message: 'Include at least one category' })
  @IsString({ each: true })
  @NotDuplicates()
  categories: string[];
}
