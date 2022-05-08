declare namespace NodeJS {
  export interface ProcessEnv {
    ENV: Enviroment;
    DB_HOST?: string;
    DB_HOST_PROD?: string;
    DB_HOST_TEST?: string;
    DB_PORT?: string;
    DB_USERNAME?: string;
    DB_USERNAME_PROD?: string;
    DB_PASSWORD?: string;
    DB_PASSWORD_PROD?: string;
    DB_NAME?: string;
    DB_NAME_PROD?: string;
    PORT?: string;
    TOKEN_KEY?: string;
    REFRESH_TOKEN_KEY?: string;
    ROLES_KEY?: string;
    SENDGRID_API_KEY?: string;
    SENDGRID_MAIL?: string;
    CLOUDINARY_CLOUD_NAME?: string;
    CLOUDINARY_API_KEY?: string;
    CLOUDINARY_API_SECRET?: string;
    CLOUDINARY_FOLDER?: string;
    GOOGLE_CLIENT_ID?: string;
    GOOGLE_SECRET_CLIENT?: string;
    GOOGLE_REDIRECT_URI?: string;
  }

  export type Enviroment = 'DEVELOPMENT' | 'PRODUCTION' | 'TEST';
}
