import { TypeOrmModuleOptions } from '@nestjs/typeorm';

interface TypeConfiguration {
  PRODUCTION: TypeOrmModuleOptions;
  DEVELOPMENT: TypeOrmModuleOptions;
  TEST: TypeOrmModuleOptions;
}
export const DB_CONFIG: TypeConfiguration = {
  PRODUCTION: {
    type: 'postgres',
    ssl: {
      rejectUnauthorized: false,
    },
    host: process.env.DB_HOST_PROD,
    port: +process.env.DB_PORT,
    username: process.env.DB_USERNAME_PROD,
    password: process.env.DB_PASSWORD_PROD,
    database: process.env.DB_NAME_PROD,
    entities: ['dist/**/*.entity{.ts,.js}'],
    synchronize: false,
    autoLoadEntities: true,
  },

  DEVELOPMENT: {
    type: 'postgres',
    host: process.env.DB_HOST,
    port: +process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: ['dist/**/*.entity{.ts,.js}'],
    synchronize: false,
    autoLoadEntities: true,
  },

  TEST: {
    type: 'postgres',
    host: process.env.DB_HOST,
    port: +process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: ['dist/**/*.entity{.ts,.js}'],
    synchronize: false,
    autoLoadEntities: true,
  },
};
