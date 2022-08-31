import dotenv from 'dotenv';

dotenv.config();

interface Config {
  databaseUrl: string;
  serverPort: number;
  secretJwt: string;
  emailLogin: string;
  emailPassword: string;
}

const config: Config = {
  databaseUrl: process.env.DATABASE_URL,
  serverPort: process.env.PORT,
  secretJwt: process.env.SECRET_JWT,
  emailLogin: process.env.EMAIL_LOGIN,
  emailPassword: process.env.EMAIL_PASSWORD,
};

export default config;
