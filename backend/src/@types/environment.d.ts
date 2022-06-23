import Role from "src/enums/role";

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production',
      PORT: number;
    }
  }
  namespace Express {
    interface Request {
      userId: string
      userRole: Role
    }
  }
}

export {};
