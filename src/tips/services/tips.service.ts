import { Injectable } from '@nestjs/common';
import { CreateTipDto, UpdateTipDto } from '@tips/dto';
import { TipsRepository } from '@tips/repositories/tips.repository';
import { User } from '@entities';
import { CategoriesService } from '@categories/services/categories.service';
import { reduce } from 'rxjs';

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

  async findAll() {
    const tips = await this.tipsRepository.findAll();

    return tips.reduce((acc, tip) => {
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

  update(id: number, updateTipDto: UpdateTipDto) {
    return `This action updates a #${id} tip`;
  }

  remove(id: number) {
    return `This action removes a #${id} tip`;
  }
}
