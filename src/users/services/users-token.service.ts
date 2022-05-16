import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { User } from '@entities';

@Injectable()
export class UsersTokenService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async getTokens(user: User) {
    const payload = { email: user.email, sub: user.userId };
    const [at, rt] = await Promise.all([
      this.jwtService.sign(payload, {
        secret: this.configService.get<string>('TOKEN_KEY'),
        expiresIn: '1d',
      }),
      this.jwtService.sign(payload, {
        secret: this.configService.get<string>('REFRESH_TOKEN_KEY'),
        expiresIn: '7d',
      }),
    ]);
    return { accessToken: at, refreshToken: rt };
  }

  async getPasswordToken(user: User) {
    const payload = { email: user.email, sub: user.userId };
    return this.jwtService.sign(payload, {
      secret: this.configService.get<string>('PASSWORD_RESET_KEY'),
      expiresIn: '1d',
    });
  }
}
