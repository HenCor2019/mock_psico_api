import { Module } from '@nestjs/common';
import { GoalsService } from '@goals/services/goals.service';
import { GoalsRepository } from '@goals/repositories/goals.repository';
import { GoalsController } from '@goals/controllers/goals.controller';

import { TypeOrmModule } from '@nestjs/typeorm';
import { Goal } from '@entities';

@Module({
  controllers: [GoalsController],
  imports: [TypeOrmModule.forFeature([Goal])],
  providers: [GoalsService, GoalsRepository],
  exports: [GoalsService, GoalsRepository],
})
export class GoalsModule {}
