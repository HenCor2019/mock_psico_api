import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UsersService } from '@users/services/users.service';
import { UsersController } from '@users/controllers/users.controller';
import { UsersRepository } from '@users/repositories/users.repository';
import { UsersHashService, UsersTokenService } from './services';
import { Category, Goal, Medal, Role, Tip, User } from '@entities';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { CloudinaryService, SendGridService } from 'src/libs';
import { MulterModule } from '@nestjs/platform-express';
import { RolesService } from '@roles/services/roles.service';
import { RolesModule } from '@roles/roles.module';
import { PermissionMiddleware } from '@common/middlewares/permission.middleware';
import { JwtRefreshStrategy, JwtStrategy } from '@common/strategies';
import { MedalsModule } from '@medals/medals.module';
import { MedalsService } from '@medals/services/medals.service';
import { MedalsRepository } from '@medals/repositories/medals.repository';
import { CategoriesService } from '@categories/services/categories.service';
import { Request } from 'src/entities/Request.entity';
import { CategoriesModule } from '@categories/categories.module';
import { CategoriesRepository } from '@categories/repositories/categories.repository';

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
    TypeOrmModule.forFeature([User, Role, Category, Tip, Goal, Medal, Request]),
    RolesModule,
    MedalsModule,
    CategoriesModule,
  ],
  controllers: [UsersController],
  providers: [
    UsersService,
    UsersRepository,
    UsersHashService,
    UsersTokenService,
    CloudinaryService,
    SendGridService,
    RolesService,
    JwtStrategy,
    JwtRefreshStrategy,
    MedalsService,
    MedalsRepository,
    CategoriesService,
    CategoriesRepository,
  ],
  exports: [UsersService, UsersRepository],
})
export class UsersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(PermissionMiddleware).forRoutes('users');
  }
}
