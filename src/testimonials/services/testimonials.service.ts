import { Injectable } from '@nestjs/common';
import { User } from '@entities';

import { CategoriesService } from '@categories/services/categories.service';

import { CreateTestimonialDto, UpdateTestimonialDto } from '@testimonials/dto';
import { TestimonialsRepository } from '@testimonials/repositories/testimonials.repository';

@Injectable()
export class TestimonialsService {
  constructor(
    private readonly testimonialsRepository: TestimonialsRepository,
    private readonly categoriesService: CategoriesService,
  ) {}

  async create(user: User, createTestimonialDto: CreateTestimonialDto) {
    const categories = await this.categoriesService.findMany(
      createTestimonialDto.categories,
    );

    return this.testimonialsRepository.create({
      ...createTestimonialDto,
      categories,
      userId: user,
    });
  }

  async findTestimonialsCategories() {
    return this.categoriesService.findAll();
  }

  async find() {
    return this.testimonialsRepository.findAll();
  }

  async findAll() {
    const testimonials = await this.testimonialsRepository.findAll();
    return testimonials.reduce((acc, testimonial) => {
      const { categories, ...rest } = testimonial;
      categories.forEach((category) => {
        if (acc[category.name]) {
          acc[category.name] = [...acc[category.name], rest];
        } else {
          acc[category.name] = [rest];
        }
      });

      return { ...acc };
    }, {});
  }

  async findById(id: number) {
    return this.testimonialsRepository.findById(id);
  }

  async findByUser(user: User) {
    return this.testimonialsRepository.findByUser(user);
  }

  async update(testimonialId: number, updateTipDto: UpdateTestimonialDto) {
    const testimony = await this.testimonialsRepository.findById(testimonialId);
    return this.testimonialsRepository.update({
      ...testimony,
      ...updateTipDto,
    });
  }

  async remove(testimonialId: number) {
    const tipToRemove = await this.testimonialsRepository.findById(
      testimonialId,
    );
    this.testimonialsRepository.remove(tipToRemove);
  }
}
