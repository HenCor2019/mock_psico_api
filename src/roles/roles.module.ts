import { Role, User } from '@entities';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RolesService } from '@roles/services/roles.service';
import { RolesRepository } from '@roles/repositories/roles.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Role, User])],
  providers: [RolesService, RolesRepository],
  exports: [RolesService, RolesRepository],
})
export class RolesModule {}
