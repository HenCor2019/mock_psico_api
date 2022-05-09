import { Injectable } from '@nestjs/common';

import { Role, User } from '@entities';

import { CreateUserDto, LoginUserDto } from '@users/dto';
import { UsersRepository } from '@users/repositories/users.repository';

import { GoogleUser } from '@common/interfaces';
import { UsersTokenService } from './users-token.service';

import { MulterFile } from '@common/types';

import { UsersHashService } from './users-hash.service';
import { CloudinaryService } from 'src/libs';
import {
  IncompleteRolesException,
  LoginException,
  UserNotFoundException,
} from '@common/exceptions';
import { RolesService } from '@roles/services/roles.service';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly usersTokenService: UsersTokenService,
    private readonly userHashService: UsersHashService,
    private readonly cloudinaryServices: CloudinaryService,
    private readonly rolesService: RolesService,
  ) {}

  async create(createUserDto: CreateUserDto, file: MulterFile) {
    const { password } = createUserDto;
    const hashPassword = await this.userHashService.hashData(password);
    const { url: photo } = await this.cloudinaryServices.upload(file.path);
    const defaultRole = await this.rolesService.findDefaultRole();
    return this.usersRepository.save({
      ...createUserDto,
      hashPassword,
      photo,
      roles: [defaultRole],
    });
  }

  async updateUserTokens(user: User) {
    const tokens = await this.usersTokenService.getTokens(user);
    const hashedToken = await this.userHashService.hashData(
      tokens.refresh_token,
    );
    await this.usersRepository.update({
      ...user,
      hashRefreshToken: hashedToken,
    });

    return tokens;
  }

  async localLogin(userToLogin: LoginUserDto) {
    const user = await this.usersRepository.findByEmail(userToLogin.email);
    const matchPassword = await this.userHashService.compareData(
      userToLogin.password,
      user?.hashPassword,
    );

    if (!(user && matchPassword)) {
      throw new LoginException();
    }

    return await this.updateUserTokens(user);
  }

  findAll() {
    return this.usersRepository.find();
  }

  findById(id: number) {
    return this.usersRepository.findById(id);
  }

  async login(userToLogin: GoogleUser) {
    const user = await this.usersRepository.findByEmail(userToLogin.email);

    const defaultRole = await this.rolesService.findDefaultRole();
    const updatedUser = await (!user
      ? this.usersRepository.save({
          ...userToLogin,
          hashPassword: '',
          roles: [defaultRole],
        })
      : this.usersRepository.updateUserPhoto(user, userToLogin.photo));

    return await this.updateUserTokens(updatedUser);
  }

  async grantRoles(userId: number, rolesToGrant: string[]) {
    const roles = await this.rolesService.findMany(rolesToGrant);
    if (roles.length !== rolesToGrant.length) {
      throw new IncompleteRolesException();
    }

    const user = await this.usersRepository.findById(userId);
    if (!user) {
      throw new UserNotFoundException();
    }

    const newRoles = this.preGrantedRoles(user.roles, roles);
    return this.usersRepository.update({
      ...user,
      roles: newRoles,
    });
  }

  async revokeRoles(userId: number, rolesToRevoke: string[]) {
    const roles = await this.rolesService.findMany(rolesToRevoke);
    if (roles.length !== rolesToRevoke.length) {
      throw new IncompleteRolesException();
    }

    const user = await this.usersRepository.findById(userId);
    if (!user) {
      throw new UserNotFoundException();
    }

    const newRoles = this.preRevokedRoles(user.roles, rolesToRevoke);
    return this.usersRepository.update({
      ...user,
      roles: newRoles,
    });
  }

  private preGrantedRoles(currentRoles: Role[], newRoles: Role[]) {
    return [...currentRoles, ...newRoles].filter(
      (role, index, self) =>
        self.findIndex((r) => r.role_id == role.role_id) === index,
    );
  }

  private preRevokedRoles(roles: Role[], rolesToRevoke: string[]) {
    return [...roles].filter((role) => !rolesToRevoke.includes(role.role));
  }
}
