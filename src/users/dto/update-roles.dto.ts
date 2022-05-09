import { NotDuplicates } from '@common/decorators';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateRolesDto {
  @ApiProperty({
    name: 'roles',
    example: ['Moderator'],
    description: 'The roles to the users',
  })
  @IsNotEmpty()
  @IsString({ each: true })
  @NotDuplicates()
  roles: string[];
}
