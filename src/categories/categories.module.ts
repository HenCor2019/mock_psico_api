import { Module } from '@nestjs/common';
import { CategoriesService } from '@categories/services/categories.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from '@entities';
import { CategoriesRepository } from '@categories/repositories/categories.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Category])],
  providers: [CategoriesService, CategoriesRepository],
  exports: [CategoriesService, CategoriesRepository],
})
export class CategoriesModule {}
