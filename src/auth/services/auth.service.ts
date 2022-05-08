import { GoogleUser } from '@common/interfaces';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { UsersService } from '@users/services/users.service';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}
  async login(googleUser: GoogleUser) {
    if (!googleUser) {
      throw new ForbiddenException('Access denied');
    }

    const tokens = await this.usersService.login(googleUser);
    return tokens;
  }
}
