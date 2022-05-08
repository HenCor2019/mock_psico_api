import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { UsersModule } from '@users/users.module';
import {
  UsersService,
  UsersHashService,
  UsersTokenService,
} from '@users/services';

import { RolesModule } from '@roles/roles.module';

import { GoogleStrategy } from '@common/strategies';

import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/auth.controller';
import { CloudinaryService } from 'src/libs';

@Module({
  imports: [JwtModule.register({}), PassportModule, UsersModule, RolesModule],
  controllers: [AuthController],
  providers: [
    AuthService,
    UsersService,
    GoogleStrategy,
    UsersTokenService,
    UsersHashService,
    CloudinaryService,
  ],
  exports: [AuthService, GoogleStrategy],
})
export class AuthModule {}
