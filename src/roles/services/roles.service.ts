import { Roles } from '@common/enums';
import { Injectable } from '@nestjs/common';
import { RolesRepository } from '@roles/repositories/roles.repository';
import { Role } from '@entities';

@Injectable()
export class RolesService {
  constructor(private readonly rolesRepository: RolesRepository) {}
}
