import { AuthModule } from '@auth/auth.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolesModule } from '@roles/roles.module';
import { TipsModule } from '@tips/tips.module';
import { UsersModule } from '@users/users.module';
import { databaseConfig } from 'src/utils/database';

const config = databaseConfig();
@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: ['.env'], isGlobal: true }),
    TypeOrmModule.forRoot({ ...config }),
    AuthModule,
    UsersModule,
    TipsModule,
    RolesModule,
  ],
})
export class AppModule {}
