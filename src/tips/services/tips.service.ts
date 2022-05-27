import { Injectable } from '@nestjs/common';
import { CreateTipDto, UpdateTipDto } from '@tips/dto';
import { TipsRepository } from '@tips/repositories/tips.repository';
import { User } from '@entities';
import { CategoriesService } from '@categories/services/categories.service';

@Injectable()
export class TipsService {
  constructor(
    private readonly categoriesServices: CategoriesService,
    private readonly tipsRepository: TipsRepository,
  ) {}

  async create(user: User, createTipDto: CreateTipDto) {
    const { categories, ...tipToCreate } = createTipDto;
    const tipsCategories = await this.categoriesServices.findMany(categories);

    return this.tipsRepository.save({
      ...tipToCreate,
      categories: tipsCategories,
      userId: user,
    });
  }

  async findTipCategories() {
    return this.categoriesServices.findAll();
  }

  async findAll() {
    const tips = await this.tipsRepository.findAll();

    return tips
      .map((tip) => ({ ...tip, title: tip.description }))
      .reduce((acc, tip) => {
        const { categories, ...rest } = tip;
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

  async find() {
    return this.tipsRepository.findAll();
  }

  findById(id: number) {
    return this.tipsRepository.findById(id);
  }

  findByUser(user: User) {
    return this.tipsRepository.findByUser(user);
  }

  async update(tipId: number, updateTipDto: UpdateTipDto) {
    const tip = await this.tipsRepository.findById(tipId);
    return this.tipsRepository.update({ ...tip, ...updateTipDto });
  }

  async remove(tipId: number) {
    const tipToRemove = await this.tipsRepository.findById(tipId);
    this.tipsRepository.remove(tipToRemove);
  }
}
