import { BinnaclesRepository } from '@binnacles/repositories/binnacles.repository';
import { Injectable } from '@nestjs/common';
import { CreateBinnacleDto } from '@binnacles/dto';
import { User } from '@entities';
import {
  AlreadyExistBinnacleException,
  MoodNotFoundException,
} from '@common/exceptions';

@Injectable()
export class BinnaclesService {
  constructor(private readonly binnacleRepository: BinnaclesRepository) {}

  async findMoods() {
    return this.binnacleRepository.findMoods();
  }
  async create(user: User, createBinnacleDto: CreateBinnacleDto) {
    const { moodId, ...binnacleToCreate } = createBinnacleDto;
    const mood = await this.binnacleRepository.findMoodById(moodId);
    if (!mood) {
      throw new MoodNotFoundException();
    }

    // const hasBinnacle = await this.binnacleRepository.findCurrentBinnacle();
    // if (hasBinnacle) {
    //   throw new AlreadyExistBinnacleException();
    // }

    return this.binnacleRepository.create({
      ...binnacleToCreate,
      userId: user,
      moodId: mood,
    });
  }

  findMyBinnacles(user: User) {
    return this.binnacleRepository.findMyBinnacles(user);
  }

  findById(id: number) {
    return this.binnacleRepository.findById(id);
  }
}
