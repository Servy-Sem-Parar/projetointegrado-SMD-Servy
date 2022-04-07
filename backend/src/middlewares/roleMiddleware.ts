import HttpError from '@models/errors/HttpError';
import User from '@models/user';
import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import config from '../config/config';
import Role from '../enums/role';

const roleMiddleware = (roles: Role[]) => {
  return (request: Request, response: Response, next: NextFunction) => {
    const { authorization } = request.headers;
    const parts = authorization.split(' ');
    const [scheme, token] = parts;

    jwt.verify(token, config.secretJwt, (error, decoded) => {
      if (error) return response.status(401).json({ error: 'Unauthorized' });
      const userId = decoded.id;
      return User.findById(userId).then((user) => {
        if (!user) return response.status(401).json({ error: 'Unauthorized' });

        if (!roles.includes(user.role)) {
          return response.status(403).json({ error: 'Forbidden' });
        }

        return next();
      });
    });
  };
};

export default roleMiddleware;
