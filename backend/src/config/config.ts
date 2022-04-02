import dotenv from 'dotenv';

dotenv.config();

interface Config {
  databaseUrl: string;
  serverPort: number;
  secretJwt: string;
}

const config: Config = {
  databaseUrl: process.env.DATABASE_URL,
  serverPort: process.env.PORT,
  secretJwt: process.env.SECRET_JWT,
};

export default config;
