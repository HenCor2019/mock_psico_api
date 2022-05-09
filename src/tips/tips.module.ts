import { Module } from '@nestjs/common';
import { TipsService } from '@tips/services/tips.service';
import { TipsController } from '@tips/controllers/tips.controller';
import { TipsRepository } from './repositories/tips.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category, Tip } from 'src/entities';
import { CategoriesService } from '@categories/services/categories.service';
import { CategoriesRepository } from '@categories/repositories/categories.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Tip, Category])],
  controllers: [TipsController],
  providers: [
    TipsService,
    TipsRepository,
    CategoriesService,
    CategoriesRepository,
  ],
})
export class TipsModule {}
