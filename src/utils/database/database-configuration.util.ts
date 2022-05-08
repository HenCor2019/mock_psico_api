import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DB_CONFIG } from './database-enviroments.env';
import { currentEnviroment } from './enviroment.util';

export const databaseConfig: () => TypeOrmModuleOptions = () => {
  const env = currentEnviroment();
  return DB_CONFIG[env] ?? DB_CONFIG.DEVELOPMENT;
};
