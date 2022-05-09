import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Medal } from '@entities';
import { In, Repository } from 'typeorm';

@Injectable()
export class MedalsRepository {
  constructor(
    @InjectRepository(Medal)
    private readonly medalsRepository: Repository<Medal>,
  ) {}

  findMany(medalsId: number[]) {
    return this.medalsRepository.find({
      where: {
        medalId: In(medalsId),
      },
    });
  }

  findByName(name: string) {
    return this.medalsRepository.findOne({ medal: name });
  }
}
