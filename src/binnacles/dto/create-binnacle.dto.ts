import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString, Length } from 'class-validator';

export class CreateBinnacleDto {
  @ApiProperty({
    name: 'thought',
    example: 'Today I pass my subject',
    description: 'The binnacle thought',
  })
  @IsString({})
  @Length(0, 200)
  thought: string;

  @ApiProperty({
    name: 'moodId',
    example: 1,
    description: 'The mood for this binnacle',
  })
  @IsInt({})
  moodId: number;
}
