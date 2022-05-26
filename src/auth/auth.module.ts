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

import { GoogleStrategy, JwtPasswordStrategy } from '@common/strategies';

import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/auth.controller';
import { CloudinaryService, SendGridService } from 'src/libs';
import { MedalsModule } from '@medals/medals.module';
import { CategoriesService } from '@categories/services/categories.service';
import { CategoriesRepository } from '@categories/repositories/categories.repository';
import { CategoriesModule } from '@categories/categories.module';

@Module({
  imports: [
    JwtModule.register({}),
    PassportModule,
    UsersModule,
    RolesModule,
    MedalsModule,
    CategoriesModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    UsersService,
    UsersTokenService,
    GoogleStrategy,
    UsersTokenService,
    JwtPasswordStrategy,
    UsersHashService,
    CloudinaryService,
    SendGridService,
  ],
  exports: [AuthService, GoogleStrategy],
})
export class AuthModule {}
