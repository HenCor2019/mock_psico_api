import { Module } from '@nestjs/common';
import { GoalsService } from '@goals/services/goals.service';
import { GoalsRepository } from '@goals/repositories/goals.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Goal } from 'src/entities';

@Module({
  imports: [TypeOrmModule.forFeature([Goal])],
  providers: [GoalsService, GoalsRepository],
  exports: [GoalsService, GoalsRepository],
})
export class GoalsModule {}
