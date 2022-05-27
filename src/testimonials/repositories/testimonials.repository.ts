import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTestimonialDto } from '@testimonials/dto';
import { Testimony, User, Category } from '@entities';
import { Repository } from 'typeorm';

type TestimonialToSave<T = CreateTestimonialDto> =
  (T extends CreateTestimonialDto ? Omit<T, 'categories'> : never) & {
    categories: Category[];
    userId: User;
  };

@Injectable()
export class TestimonialsRepository {
  constructor(
    @InjectRepository(Testimony)
    private readonly testimonialsRepository: Repository<Testimony>,
  ) {}

  create(testimonialToSave: TestimonialToSave) {
    const newTestimonial = this.testimonialsRepository.create({
      ...testimonialToSave,
    });

    return this.testimonialsRepository.save({ ...newTestimonial });
  }

  findAll() {
    return this.testimonialsRepository.find({
      relations: ['userId', 'categories', 'userId.contacts'],
    });
  }

  findById(id: number) {
    return this.testimonialsRepository.findOne(id, { relations: ['userId'] });
  }

  findByUser(user: User) {
    return this.testimonialsRepository.find({
      where: {
        userId: user,
      },
      relations: ['categories'],
    });
  }

  async update(testimonialToUpdate: Testimony) {
    return this.testimonialsRepository.save({ ...testimonialToUpdate });
  }

  async remove(testimonialToRemove: Testimony) {
    this.testimonialsRepository.remove(testimonialToRemove);
  }
}
