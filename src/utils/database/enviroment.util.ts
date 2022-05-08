import { Envs } from '@common/enums';

export const currentEnviroment = () => {
  const { ENV } = process.env;
  if (ENV === Envs.PRODUCTION) {
    return Envs.PRODUCTION;
  }

  if (ENV === Envs.TEST) {
    return Envs.TEST;
  }

  return Envs.DEVELOPMENT;
};
