import HttpError from '@models/errors/HttpError';
import User from '@models/user';
import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import config from '../config/config';
import Role from '../enums/role';

const roleMiddleware = (roles: Role[]) => {
  return async (request: Request, response: Response, next: NextFunction) => {
    const { userId } = request;

    const user = await User.findById(userId);

    if (!user) throw new HttpError('Unauthorized', 401);
    request.userRole = user.role
    if (user.role === Role.ADMIN) {
      return next();
    } if (roles.includes(Role.SELF)) {
      const bodyId = request.params.id;
      if (bodyId !== userId) throw new HttpError('Forbidden', 403);
    } else if (!roles.includes(user.role)) {
      throw new HttpError('Forbidden', 403);
    }

    return next();
  };
};

export default roleMiddleware;
