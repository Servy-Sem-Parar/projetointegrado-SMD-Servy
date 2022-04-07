import { Request, Response } from 'express';
import User from '@models/user';
import IUser from '@interfaces/user';
import HttpError from '@models/errors/HttpError';
import mongoose from '../database';

require('express-async-errors');

async function createUser(name: string, password: string, email: string) {
  if (await User.findOne({ email })) throw new HttpError('Usuário já cadastrado', 409);

  const user = new User({
    _id: new mongoose.Types.ObjectId(),
    name,
    password,
    email,
  });

  const result = await user.save();

  return result;
}

const create = async (request: Request, response: Response): Promise<Response> => {
  const { name, password, email } = request.body;

  const result = await createUser(name, password, email);

  return response.status(201).json({ user: result });
};

const list = async (request: Request, response: Response): Promise<Response> => {
  const users = await User.find().exec();

  return response.status(200).json({ users });
};

export default {
  create,
  list,
  createUser,
};
