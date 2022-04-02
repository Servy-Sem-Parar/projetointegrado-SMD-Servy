import { Request, Response } from 'express';
import User from '@models/user';
import userController from '@controllers/userController';
import HttpError from '@models/errors/HttpError';
import bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import mongoose from '../database';
import config from '../config/config';

require('express-async-errors');

function generateToken(userId) {
  return jwt.sign({ id: userId }, config.secretJwt, { expiresIn: 86400 });
}

const login = async (request: Request, response: Response) => {
  const { email, password } = request.body;

  const user = await User.findOne({ email }).select('+password');

  if (!user) throw new HttpError('Usuário não encontrado', 404);

  if (!await bcrypt.compare(password, user.password)) {
    throw new HttpError('Senha incorreta', 400);
  }

  const token = generateToken(user.id);

  delete user.password;
  response.send({ user, token });
};

const register = async (request: Request, response: Response) => {
  const { name, password, email } = request.body;

  const user = await userController.createUser(name, password, email);
  const token = generateToken(user.id);

  return response.status(201).json({ user, token });
};

export default {
  login,
  register,
};
