import { ForbiddenException, Injectable } from '@nestjs/common';

import { User } from '@entities';

import { CreateUserDto, LoginUserDto, UpdateUserDto } from '@users/dto';
import { UsersRepository } from '@users/repositories/users.repository';

import { UserProfile } from '@common/enums';
import { GoogleUser } from '@common/interfaces';
import { UsersTokenService } from './users-token.service';

import { MulterFile } from '@common/types';

import { UsersHashService } from './users-hash.service';
import { CloudinaryService } from 'src/libs';
import { LoginException, UserNotFoundException } from '@common/exceptions';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly usersTokenService: UsersTokenService,
    private readonly userHashService: UsersHashService,
    private readonly cloudinaryServices: CloudinaryService,
  ) {}

  async create(createUserDto: CreateUserDto, file: MulterFile) {
    const { password } = createUserDto;
    const hashPassword = await this.userHashService.hashData(password);
    const { url: photo } = await this.cloudinaryServices.upload(file.path);
    return this.usersRepository.save({ ...createUserDto, hashPassword, photo });
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
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  async login(userToLogin: GoogleUser) {
    const user = await this.usersRepository.findByEmail(userToLogin.email);

    const updatedUser = await (user
      ? this.usersRepository.save({ ...userToLogin, hashPassword: null })
      : this.usersRepository.updateUserPhoto(user, userToLogin.photo));

    return await this.updateUserTokens(updatedUser);
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
