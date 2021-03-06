import { Injectable } from '@nestjs/common';
import { RolesRepository } from '@roles/repositories/roles.repository';

@Injectable()
export class RolesService {
  constructor(private readonly rolesRepository: RolesRepository) {}

  async findDefaultRole() {
    const DEFAULT_ROLE = 1;
    return this.rolesRepository.findById(DEFAULT_ROLE);
  }

  async findMany(roles: string[]) {
    return this.rolesRepository.find(...roles);
  }

  async findByName(name: string) {
    return this.rolesRepository.findByName(name);
  }
}
