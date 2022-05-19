import { ForbiddenException, Injectable } from '@nestjs/common';

import { Role, User } from '@entities';

import { CreateUserDto, LoginUserDto, UpdateUserDto } from '@users/dto';
import { UsersRepository } from '@users/repositories/users.repository';

import { GoogleUser } from '@common/interfaces';
import { UsersTokenService } from './users-token.service';

import { MulterFile } from '@common/types';

import { UsersHashService } from './users-hash.service';
import { CloudinaryService } from 'src/libs';
import {
  AlreadyExistUserException,
  IncompleteRolesException,
  LoginException,
  UserNotFoundException,
} from '@common/exceptions';
import { RolesService } from '@roles/services/roles.service';
import { MedalsService } from '@medals/services/medals.service';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly usersTokenService: UsersTokenService,
    private readonly userHashService: UsersHashService,
    private readonly cloudinaryServices: CloudinaryService,
    private readonly rolesService: RolesService,
    private readonly medalsService: MedalsService,
  ) {}

  async create(createUserDto: CreateUserDto, file: MulterFile) {
    const { password } = createUserDto;
    const hashPassword = await this.userHashService.hashData(password);
    const user = await this.usersRepository.findByEmail(createUserDto.email);
    if (user) {
      throw new AlreadyExistUserException();
    }

    const { url: photo } = await this.cloudinaryServices.upload(file.path);
    const defaultRole = await this.rolesService.findDefaultRole();
    const displayName = createUserDto.fullname
      .split(' ')
      .filter((_, index) => index < 2)
      .join(' ');

    return this.usersRepository.save({
      ...createUserDto,
      hashPassword,
      photo,
      displayName,
      roles: [defaultRole],
    });
  }

  async updateUserTokens(user: User) {
    const tokens = await this.usersTokenService.getTokens(user);
    const hashedToken = await this.userHashService.hashData(
      tokens.refreshToken,
    );
    await this.usersRepository.update({
      ...user,
      hashRefreshToken: hashedToken,
    });

    return tokens;
  }

  async updateUser(userId: number, userToUpdate: UpdateUserDto) {
    const user = await this.usersRepository.findById(userId);
    if (!user) {
      throw new UserNotFoundException();
    }

    const { email } = userToUpdate;
    const userWithEmail = await this.usersRepository.findByEmail(email || '');
    if (userWithEmail && userWithEmail.email !== email) {
      throw new AlreadyExistUserException();
    }

    return this.usersRepository.save({ ...user, ...userToUpdate });
  }

  async delete(userId: number) {
    const userToDelete = await this.usersRepository.findById(userId);
    if (!userToDelete) {
      throw new UserNotFoundException();
    }

    this.usersRepository.delete(userToDelete);
  }

  async localLogin(userToLogin: LoginUserDto) {
    const user = await this.usersRepository.findByEmail(userToLogin.email);
    const matchPassword = user?.hashPassword
      ? await this.userHashService.compareData(
          userToLogin.password,
          user.hashPassword,
        )
      : false;

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

  findByEmail(email: string) {
    return this.usersRepository.findByEmail(email);
  }

  async findMyInformation(id: number) {
    const information = await this.usersRepository.findMyInformation(id);
    if (!information) {
      throw new UserNotFoundException();
    }
    return information;
  }

  async login(userToLogin: GoogleUser) {
    const user = await this.usersRepository.findByEmail(userToLogin.email);

    const defaultRole = await this.rolesService.findDefaultRole();
    const displayName = userToLogin.fullname
      .split(' ')
      .filter((_, index) => index < 2)
      .join(' ');
    const updatedUser = await (!user
      ? this.usersRepository.save({
          ...userToLogin,
          hashPassword: '',
          displayName,
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

  async updatePassword(user: User, newPassword: string) {
    const hashPassword = await this.userHashService.hashData(newPassword);
    return this.usersRepository.update({
      ...user,
      hashPassword,
    });
  }

  async grantMedal(user: User, medalName: string) {
    if (this.medalsService.hasMedal(user, medalName)) {
      return { adquired: true };
    }

    const medal = await this.medalsService.findByName(medalName);
    await this.usersRepository.update({
      ...user,
      medals: [...user.medals, medal],
    });

    return { adquired: true };
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

  async logout(user: User) {
    await this.usersRepository.update({ ...user, hashRefreshToken: null });
  }

  async refreshToken(userId: number, refreshToken: string) {
    const user = await this.findById(userId);
    if (!(user && user.hashRefreshToken)) {
      throw new ForbiddenException('Access denied');
    }

    const isMatch = await this.userHashService.compareData(
      refreshToken,
      user.hashRefreshToken,
    );

    if (!isMatch) {
      throw new ForbiddenException('Access denied');
    }

    const tokens = await this.updateUserTokens(user);
    return tokens;
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
