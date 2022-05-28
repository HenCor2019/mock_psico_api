import { AuthModule } from '@auth/auth.module';
import { BinnaclesModule } from '@binnacles/binnacles.module';
import { GoalsModule } from '@goals/goals.module';
import { MedalsModule } from '@medals/medals.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolesModule } from '@roles/roles.module';
import { TestimonialsModule } from '@testimonials/testimonials.module';
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
    TestimonialsModule,
    BinnaclesModule,
    TipsModule,
    GoalsModule,
    MedalsModule,
  ],
})
export class AppModule {}
