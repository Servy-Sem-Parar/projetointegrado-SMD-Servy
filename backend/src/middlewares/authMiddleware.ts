import HttpError from '@models/errors/HttpError';
import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import config from '../config/config';

const authMiddleware = (request: Request, response: Response, next: NextFunction) => {
  const { authorization } = request.headers;

  if (!authorization) throw new HttpError('Unauthorized', 401);

  const parts = authorization.split(' ');

  if (parts.length !== 2) throw new HttpError('Unauthorized', 401);

  const [scheme, token] = parts;

  if (!scheme.startsWith('Bearer')) throw new HttpError('Unauthorized', 401);

  jwt.verify(token, config.secretJwt, (error, decoded) => {
    if (error) throw new HttpError('Unauthorized', 401);

    request.userId = decoded.id;
    return next();
  });
};

export default authMiddleware;
