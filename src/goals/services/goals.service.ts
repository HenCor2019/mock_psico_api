import { Injectable } from '@nestjs/common';
import { CreateGoalDto, UpdateGoalDto } from '@goals/dto';
import { GoalsRepository } from '@goals/repositories/goals.repository';
import { User } from '@entities';

@Injectable()
export class GoalsService {
  constructor(private readonly goalsRepository: GoalsRepository) {}
  create(user: User, createGoalDto: CreateGoalDto) {
    return this.goalsRepository.create({ ...createGoalDto, userId: user });
  }

  findMyGoals(user: User) {
    return this.goalsRepository.findMyGoals(user);
  }

  findById(id: number) {
    return this.goalsRepository.findById(id);
  }

  async update(id: number, updateGoalDto: UpdateGoalDto) {
    const goal = await this.goalsRepository.findById(id);
    return this.goalsRepository.update({ ...goal, ...updateGoalDto });
  }

  async remove(id: number) {
    const goal = await this.goalsRepository.findById(id);
    this.goalsRepository.remove(goal);
  }
}
