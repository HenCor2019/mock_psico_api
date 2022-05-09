import { Injectable } from '@nestjs/common';
import { CreateGoalDto } from '@goals/dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Goal, User } from '@entities';
import { Repository } from 'typeorm';

type GoalToSave<T = CreateGoalDto> = T & { userId: User };

@Injectable()
export class GoalsRepository {
  constructor(
    @InjectRepository(Goal)
    private readonly goalsRepository: Repository<Goal>,
  ) {}

  create(goalToSave: GoalToSave) {
    const newGoal = this.goalsRepository.create({ ...goalToSave });
    return this.goalsRepository.save({ ...newGoal });
  }

  findMyGoals(user: User) {
    return this.goalsRepository.find({
      where: {
        userId: user,
      },
    });
  }

  findById(id: number) {
    return this.goalsRepository.findOne(
      { goalId: id },
      { relations: ['userId'] },
    );
  }

  update(goalToUpdate: Goal) {
    return this.goalsRepository.save(goalToUpdate);
  }

  remove(goalToRemove: Goal) {
    this.goalsRepository.remove(goalToRemove);
  }
}
