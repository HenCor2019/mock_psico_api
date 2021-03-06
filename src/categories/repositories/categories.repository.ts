import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/entities';
import { ILike, In, Repository } from 'typeorm';

@Injectable()
export class CategoriesRepository {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async findAll() {
    return this.categoryRepository.find();
  }

  async findById(id: number) {
    return this.categoryRepository.findOne({ categoryId: id });
  }

  async findByName(category: string) {
    return this.categoryRepository.findOne({
      name: ILike(`%${category}%`),
    });
  }

  async findMany(categories: string[]) {
    return this.categoryRepository.find({ name: In(categories) });
  }

  async findManyById(categories: number[]) {
    return this.categoryRepository.find({ categoryId: In(categories) });
  }
}
