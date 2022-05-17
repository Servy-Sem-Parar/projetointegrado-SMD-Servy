import HttpError from '@models/errors/HttpError';
import { NextFunction, Request, Response } from 'express';

const errorMiddleware = (err: Error, request: Request, response: Response, next: NextFunction) => {
  if (err instanceof HttpError) {
    response.status(err.code);
  } else {
    console.log(err);
    response.status(500);
  }
  response.json({ error: err.message });
};

export default errorMiddleware;
