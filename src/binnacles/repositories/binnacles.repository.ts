import { Injectable } from '@nestjs/common';
import { CreateBinnacleDto } from '@binnacles/dto';
import { User } from '@entities';
import { InjectRepository } from '@nestjs/typeorm';
import { Binnacle, Mood } from '@entities';
import { Repository } from 'typeorm';

type BinnacleToSave<T = CreateBinnacleDto> = (T extends CreateBinnacleDto
  ? Omit<T, 'moodId'>
  : never) & { moodId: Mood; userId: User };

@Injectable()
export class BinnaclesRepository {
  constructor(
    @InjectRepository(Binnacle)
    private readonly binnacleRepository: Repository<Binnacle>,
    @InjectRepository(Mood)
    private readonly moodsRepository: Repository<Mood>,
  ) {}

  create(binnacleToSave: BinnacleToSave) {
    const newBinnacle = this.binnacleRepository.create({
      ...binnacleToSave,
      binnacleDate: new Date(new Date().setHours(0, 0, 0, 0)),
    });
    return this.binnacleRepository.save(newBinnacle);
  }

  findMyBinnacles(user: User) {
    return this.binnacleRepository.find({
      where: { userId: user },
      relations: ['userId', 'moodId'],
    });
  }

  findById(id: number) {
    return this.binnacleRepository.findOne(
      { binnacleId: id },
      { relations: ['userId', 'moodId'] },
    );
  }

  findCurrentBinnacle() {
    return this.binnacleRepository.findOne({
      where: {
        binnacleDate: new Date(new Date().setHours(0, 0, 0, 0)),
      },
    });
  }

  findMoodById(id: number) {
    return this.moodsRepository.findOne({ moodId: id });
  }

  findMoods() {
    return this.moodsRepository.find();
  }
}
