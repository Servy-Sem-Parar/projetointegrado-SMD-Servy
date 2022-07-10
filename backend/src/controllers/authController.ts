import { Request, Response } from 'express';
import User from '@models/user';
import userController from '@controllers/userController';
import HttpError from '@models/errors/HttpError';
import bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import mongoose from '../database';
import config from '../config/config';
import UserStatus from '../enums/userStatus';

require('express-async-errors');

function generateToken(userId) {
  return jwt.sign({ id: userId }, config.secretJwt, { expiresIn: 86400 });
}

const login = async (request: Request, response: Response): Promise<Response> => {
  const { email, password } = request.body;

  const user = await User.findOne({ email }).select('+password');

  if (!user) throw new HttpError('Usuário não encontrado', 404);
  if (user.status === UserStatus.PENDING) throw new HttpError('Aprovação pendente.', 403);

  if (!await bcrypt.compare(password, user.password)) {
    throw new HttpError('Senha incorreta', 400);
  }

  const token = generateToken(user.id);

  user.password = undefined;
  return response.send({ user, token });
};

const register = async (request: Request, response: Response): Promise<Response> => {
  const {
    name, password, email, birthDate, phone_number, schoolType, wantedTurmas, address,
  } = request.body;

  if (await User.findOne({ email })) throw new HttpError('Usuário já cadastrado', 409);

  const result = new User({
    _id: new mongoose.Types.ObjectId(),
    name,
    password,
    email,
    birthDate,
    phone_number,
    schoolType,
    wantedTurmas,
    address,
    status: UserStatus.PENDING,
  });

  const user = await result.save();
  const token = generateToken(user.id);

  user.password = undefined;
  return response.status(201).json({ user, token });
};

const changePassword = async (request: Request, response: Response): Promise<Response> => {
  const { email, oldPassword, newPassword } = request.body;

  if (!newPassword || !oldPassword) throw new HttpError('Senha não informada', 400);

  const user = await User.findOne({ email }).select('+password');

  if (!user) throw new HttpError('Usuário não encontrado', 404);

  if (!await bcrypt.compare(oldPassword, user.password)) {
    throw new HttpError('Senha incorreta', 400);
  }

  user.password = newPassword;
  await user.save();

  const token = generateToken(user.id);
  user.password = undefined;
  return response.send({ user, token });
};

export default {
  login,
  register,
  changePassword,
};
