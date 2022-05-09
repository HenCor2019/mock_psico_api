import { UserNotFoundException } from '@common/exceptions';
import { GoogleUser } from '@common/interfaces';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { UsersTokenService, UsersService } from '@users/services';
import { User } from '@entities';
import { SendGridService } from 'src/libs';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly usersTokenService: UsersTokenService,
    private readonly sendGridService: SendGridService,
  ) {}

  async login(googleUser: GoogleUser) {
    if (!googleUser) {
      throw new ForbiddenException('Access denied');
    }

    const tokens = await this.usersService.login(googleUser);
    return tokens;
  }

  async requestPassword(email: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new UserNotFoundException();
    }

    const token = await this.usersTokenService.getPasswordToken(user);
    await this.sendGridService.requestPassword(user.email, token);
    return {
      message: 'Email successfully sent',
    };
  }

  async resetPassword(user: User, newPassword: string) {
    await this.usersService.updatePassword(user, newPassword);
    return {
      message: 'Password successfully changed',
    };
  }
}
