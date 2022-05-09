import { OmitType, PartialType } from '@nestjs/swagger';
import { CreateTestimonialDto } from './create-testimonial.dto';

export class UpdateTestimonialDto extends PartialType(
  OmitType(CreateTestimonialDto, ['categories'] as const),
) {}
