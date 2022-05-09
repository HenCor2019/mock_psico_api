import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category, Tip, User } from '@entities';
import { Repository } from 'typeorm';

import { CreateTipDto, UpdateTipDto } from '@tips/dto';

type TipToSave<T = CreateTipDto> = (T extends CreateTipDto
  ? Omit<T, 'categories'>
  : never) & { categories: Category[]; userId: User };

@Injectable()
export class TipsRepository {
  constructor(
    @InjectRepository(Tip)
    private readonly tipsRepository: Repository<Tip>,
  ) {}

  async save(tipToSave: TipToSave) {
    const newTip = this.tipsRepository.create({ ...tipToSave });
    return this.tipsRepository.save(newTip);
  }

  async findAll() {
    return this.tipsRepository.find({ relations: ['userId', 'categories'] });
  }

  async findById(id: number) {
    return this.tipsRepository.findOne(
      { tipId: id },
      { relations: ['userId'] },
    );
  }

  async update(tipToUpdate: Tip) {
    return this.tipsRepository.save({ ...tipToUpdate });
  }

  async remove(tipToRemove: Tip) {
    this.tipsRepository.remove(tipToRemove);
  }
}
