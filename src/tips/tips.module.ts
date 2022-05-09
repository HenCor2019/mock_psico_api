import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TipsService } from '@tips/services/tips.service';
import { TipsController } from '@tips/controllers/tips.controller';
import { TipsRepository } from '@tips/repositories/tips.repository';

import { Category, Tip } from '@entities';

import { CategoriesService } from '@categories/services/categories.service';
import { CategoriesRepository } from '@categories/repositories/categories.repository';

@Module({
  controllers: [TipsController],
  imports: [TypeOrmModule.forFeature([Tip, Category])],
  providers: [
    TipsService,
    TipsRepository,
    CategoriesService,
    CategoriesRepository,
  ],
})
export class TipsModule {}
