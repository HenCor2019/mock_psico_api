import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/entities';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriesRepository {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async findAll() {
    return this.categoryRepository.find();
  }

  async findByName(category: string) {
    return this.categoryRepository.findOne({ name: category });
  }

  async findMany(categories: string[]) {
    return Promise.all(categories.map((category) => this.findByName(category)));
  }
}
