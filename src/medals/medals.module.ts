import { Module } from '@nestjs/common';
import { MedalsRepository } from '@medals/repositories/medals.repository';
import { MedalsService } from '@medals/services/medals.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Medal } from '@entities';

@Module({
  imports: [TypeOrmModule.forFeature([Medal])],
  providers: [MedalsService, MedalsRepository],
  exports: [MedalsService, MedalsRepository],
})
export class MedalsModule {}
