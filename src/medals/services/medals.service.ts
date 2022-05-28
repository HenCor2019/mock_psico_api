import { Medals } from '@common/enums';
import { IncompleteMedalsException } from '@common/exceptions';
import { MedalsRepository } from '@medals/repositories/medals.repository';
import { Injectable } from '@nestjs/common';
import { User } from '@entities';

@Injectable()
export class MedalsService {
  constructor(private readonly medalsRepository: MedalsRepository) {}

  async find() {
    return this.medalsRepository.find();
  }

  async findMany(medalsId: number[]) {
    const medals = await this.medalsRepository.findMany(medalsId);
    if (medals.length !== medalsId.length) {
      throw new IncompleteMedalsException();
    }

    return medals;
  }

  async findByName(name: string) {
    const medal = await this.medalsRepository.findByName(name);
    if (!medal) {
      throw new IncompleteMedalsException();
    }

    return medal;
  }

  hasMedal(user: User, name: string) {
    return user.medals.some((medal) => medal.medal === name);
  }

  hasTipsMedal(user: User) {
    return user.medals.some((medal) => medal.medal === Medals.TIPS);
  }

  hasTestimonialsMedal(user: User) {
    return user.medals.some((medal) => medal.medal === Medals.TESTIMONIALS);
  }

  hasBinnaclesMedal(user: User) {
    return user.medals.some((medal) => medal.medal === Medals.BINNACLES);
  }
}
