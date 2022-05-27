import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class QueryUserDto {
  @ApiProperty({
    name: 'q',
    required: false,
    description: 'The pattern for search the user',
  })
  @IsString()
  @IsOptional()
  q?: string;

  @ApiProperty({
    name: 'category',
    required: false,
    description: 'The category to filter users',
  })
  @IsString()
  @IsOptional()
  category?: string;
}
