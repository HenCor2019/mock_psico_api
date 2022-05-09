import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Category, Testimony } from '@entities';

import { TestimonialsService } from '@testimonials/services/testimonials.service';
import { TestimonialsRepository } from '@testimonials/repositories/testimonials.repository';
import { TestimonialsController } from '@testimonials/controllers/testimonials.controller';

import { CategoriesService } from '@categories/services/categories.service';
import { CategoriesRepository } from '@categories/repositories/categories.repository';

@Module({
  controllers: [TestimonialsController],
  imports: [TypeOrmModule.forFeature([Testimony, Category])],
  providers: [
    TestimonialsService,
    TestimonialsRepository,
    CategoriesService,
    CategoriesRepository,
  ],
  exports: [TestimonialsService, TestimonialsRepository],
})
export class TestimonialsModule {}
