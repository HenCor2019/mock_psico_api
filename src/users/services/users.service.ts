import { ForbiddenException, Injectable } from '@nestjs/common';

import { User } from '@entities';

import { CreateUserDto, UpdateUserDto } from '@users/dto';
import { UsersRepository } from '@users/repositories/users.repository';

import { UserProfile } from '@common/enums';
import { GoogleUser } from '@common/interfaces';

import { UsersHashService } from './users-hash.service';
import { UsersTokenService } from './users-token.service';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly usersTokenService: UsersTokenService,
    private readonly userHashService: UsersHashService,
  ) {}

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
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

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  async login(userToLogin: GoogleUser) {
    const user = await this.usersRepository.findByEmail(userToLogin.email);
    if (!user) {
      throw new ForbiddenException('Access denied');
    }

    const updatedUser =
      user.photo === UserProfile.PHOTO
        ? await this.usersRepository.updateUserPhoto(user, userToLogin.photo)
        : user;

    return await this.updateUserTokens(updatedUser);
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
