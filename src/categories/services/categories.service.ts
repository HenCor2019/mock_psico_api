import { IncompleteCategoriesException } from '@common/exceptions';
import { Injectable } from '@nestjs/common';
import { CategoriesRepository } from '@categories/repositories/categories.repository';

@Injectable()
export class CategoriesService {
  constructor(private readonly categoriesRepository: CategoriesRepository) {}

  findAll() {
    return this.categoriesRepository.findAll();
  }

  findByName(name: string) {
    return this.categoriesRepository.findByName(name);
  }

  async findMany(categoriesToFind: string[]) {
    const categories = await this.categoriesRepository.findMany(
      categoriesToFind,
    );

    if (categories.length !== categoriesToFind.length) {
      throw new IncompleteCategoriesException();
    }

    return categories;
  }

  async findManyById(categoriesToFind: number[]) {
    const categories = await this.categoriesRepository.findManyById(
      categoriesToFind,
    );

    if (categories.length !== categoriesToFind.length) {
      throw new IncompleteCategoriesException();
    }

    return categories;
  }
}
