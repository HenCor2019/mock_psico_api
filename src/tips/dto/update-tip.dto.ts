import { OmitType, PartialType } from '@nestjs/swagger';
import { CreateTipDto } from './create-tip.dto';

export class UpdateTipDto extends PartialType(
  OmitType(CreateTipDto, ['categories'] as const),
) {}
