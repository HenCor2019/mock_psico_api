import { OmitType, PartialType } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(
  OmitType(CreateUserDto, ['password' as const]),
) {
  @IsOptional()
  @IsString({ message: 'about me must be a string' })
  @MinLength(0, { message: 'about me must be at least one 0' })
  @MaxLength(150, { message: 'about me is too longer' })
  aboutMe?: string;

  @IsOptional()
  @IsString({ message: 'display name must be a string' })
  @MinLength(0, { message: 'display name me must be at least one 0' })
  @MaxLength(25, { message: 'display name is too longer' })
  @Matches(
    /\b([A-Z]{1}[a-z]{1,30}[- ]{0,1}|[A-Z]{1}[- \']{1}[A-Z]{0,1}[a-z]{1,30}[- ]{0,1}|[a-z]{1,2}[ -\']{1}[A-Z]{1}[a-z]{1,30}){2,5}/,
    {
      message: 'display name have an invalid format',
    },
  )
  displayName?: string;
}
