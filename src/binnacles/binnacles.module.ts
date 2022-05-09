import { Module } from '@nestjs/common';
import { BinnaclesController } from '@binnacles/controllers/binnacles.controller';
import { BinnaclesService } from '@binnacles/services/binnacles.service';
import { BinnaclesRepository } from '@binnacles/repositories/binnacles.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Binnacle, Mood } from '@entities';

@Module({
  controllers: [BinnaclesController],
  imports: [TypeOrmModule.forFeature([Binnacle, Mood])],
  providers: [BinnaclesService, BinnaclesRepository],
})
export class BinnaclesModule {}
