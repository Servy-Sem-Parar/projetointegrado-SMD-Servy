import { Request, Response } from 'express';
import User from '@models/user';
import IUser from '@interfaces/user';
import HttpError from '@models/errors/HttpError';
import Turma from '@models/turma';
import bcrypt from 'bcryptjs';
import config from '@config/config';
import UserStatus from '../enums/userStatus';
import emailer from '../services/email';
import CrudController from './crudController';
import mongoose from '../database';
import Role from '../enums/role';

require('express-async-errors');

class UserController extends CrudController<IUser, typeof User> {
  override getEntity() {
    return User;
  }

  override populate(entity) {
    return entity.populate('wantedTurmas');
  }

  override async createFromParameters(request: Request): Promise<IUser> {
    const { email } = request.body;

    if (await User.findOne({ email })) {
      throw new HttpError('Usuário já cadastrado', 409);
    }

    return super.createFromParameters(request);
  }

  override async updateFromParameters(request: Request): Promise<IUser> {
    const user = await User.findById(request.userId);
    // se o usuario tentar alterar a propria role
    if (request.body.role && user.role !== request.body.role && user.role !== Role.ADMIN) {
      throw new HttpError('Forbidden', 403);
    }

    if (request.body.password) {
      request.body.password = await bcrypt.hash(request.body.password, 10);
    }

    if (request.body.status && request.body.status !== user.status) {
      const wasApproved = request.body.status === UserStatus.APPROVED;
      const mailOptions = {
        from: config.emailLogin,
        to: user.email,
        subject: wasApproved ? 'Projeto sem parar - Solicitação aprovada' : 'Projeto sem parar - Solicitação rejeitada',
        text: wasApproved ? `Parabéns, você foi aprovada para as turmas de ${user.wantedTurmas.map((t) => t.name).join(', ')}.` : 'Infelizmente, suas solicitações foram rejeitadas. Por favor, verifique suas informações e realize o cadastro novamente.',
      };
      emailer.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
        } else {
          console.log(`Email sent: ${info.response}`);
        }
      });
    }

    return super.updateFromParameters(request);
  }

  override prepareQuery(request: Request, query: mongoose.FilterQuery<IUser>, options: any): void {
    options.populate = ['wantedTurmas'];

    const {
      name, email, role, status,
    } = request.query;
    if (name) {
      query.name = { $regex: new RegExp(name as string), $options: 'i' };
    }
    if (email) {
      query.email = { $regex: new RegExp(email as string), $options: 'i' };
    }
    if (role) {
      query.role = role;
    }
    if (status) {
      query.status = status;
    }
  }

  override async posUpdate(user: IUser, request: Request): Promise<void> {
    // recebe as turmas e adiciona o usuario na turma
    const { turmas: novasTurmas } = request.body;
    if (!novasTurmas) return;
    const userId = user._id;
    const roleField = user.role === 'teacher' || user.role === 'admin' ? 'teachers' : 'students';
    await Turma.updateMany(
      { [roleField]: userId },
      { $pull: { [roleField]: userId } },
      { multi: true },
    );
    await Turma.updateMany(
      { _id: { $in: novasTurmas } },
      { $addToSet: { [roleField]: userId } },
      { multi: true },
    );
  }

  override async posRead(user: IUser): Promise<void> {
    const roleField = user.role === 'teacher' || user.role === 'admin' ? 'teachers' : 'students';
    const turmas = await Turma.find({ [roleField]: user._id }).populate('disciplina').populate('aulas').populate('teachers')
      .exec();
    user._doc.turmas = turmas;
  }

  professoras = async (request: Request, response: Response): Promise<Response> => {
    const pesquisa = this.pesquisaPadrao(request);
    pesquisa[0] = {
      ...pesquisa[0],
      $or: [
        { role: 'admin' },
        { role: 'teacher' },
      ],
    };
    const result = await this.getEntity().paginate(...pesquisa);

    return response.status(200).json({ data: result.docs, total: result.totalPages });
  };

  alunas = async (request: Request, response: Response): Promise<Response> => {
    const pesquisa = this.pesquisaPadrao(request);
    pesquisa[0] = {
      ...pesquisa[0],
      role: 'student',
    };
    const result = await this.getEntity().paginate(...pesquisa);

    return response.status(200).json({ data: result.docs, total: result.totalPages });
  };
}

export default new UserController();
