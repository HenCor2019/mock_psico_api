import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UsersService } from '@users/services/users.service';
import { UsersController } from '@users/controllers/users.controller';
import { UsersRepository } from '@users/repositories/users.repository';
import { UsersHashService, UsersTokenService } from './services';
import { Role, User } from '@entities';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { CloudinaryService } from 'src/libs';
import { MulterModule } from '@nestjs/platform-express';
import { RolesService } from '@roles/services/roles.service';
import { RolesModule } from '@roles/roles.module';
import { PermissionMiddleware } from '@common/middlewares/permission.middleware';
import { JwtRefreshStrategy, JwtStrategy } from '@common/strategies';

@Module({
  imports: [
    MulterModule.register({
      dest: './upload',
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        return {
          secret: configService.get<string>('TOKEN_KEY'),
          signOptions: { expiresIn: '1d' },
        };
      },
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([User, Role]),
    RolesModule,
  ],
  controllers: [UsersController],
  providers: [
    UsersService,
    UsersRepository,
    UsersHashService,
    UsersTokenService,
    CloudinaryService,
    RolesService,
    JwtStrategy,
    JwtRefreshStrategy,
  ],
  exports: [UsersService, UsersRepository],
})
export class UsersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(PermissionMiddleware).forRoutes('users');
  }
}
