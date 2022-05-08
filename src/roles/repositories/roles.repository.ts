import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role, User } from '@entities';
import { In, Repository } from 'typeorm';

@Injectable()
export class RolesRepository {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findById(roleId: number) {
    return this.roleRepository.findOne({ role_id: roleId });
  }

  async findByName(role: string) {
    return this.roleRepository.findOne({ role });
  }

  async update(userToUpdate: User) {
    return this.userRepository.save({ ...userToUpdate });
  }

  async find(...roles: string[]) {
    return this.roleRepository.find({ where: { role: In(roles) } });
  }
}
