import { Request, Response } from 'express';
import User from '@models/user';
import IUser from '@interfaces/user';
import HttpError from '@models/errors/HttpError';
import CrudController from './crudController';
import mongoose from '../database';
import Role from '../enums/role';
import { ParamsDictionary } from 'express-serve-static-core';
import { ParsedQs } from 'qs';
import Turma from '@models/turma';

require('express-async-errors');

class UserController extends CrudController<IUser, typeof User> {
  override getEntity() {
    return User;
  }

  override populate(entity) {
    return entity;
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

    return super.updateFromParameters(request);
  }

  override prepareQuery(request: Request, query: mongoose.FilterQuery<IUser>, options: any): void {
    const {name, email, role, status} = request.query
    if (name) {
      query.name = {$regex: new RegExp(name as string), $options: "i"}
    }
    if (email) {
      query.email = {$regex: new RegExp(email as string), $options: "i"}
    }
    if (role) {
      query.role = role
    }
    if (status) {
      query.status = status
    }
  }

  override async posUpdate(user: IUser, request: Request): Promise<void> {
    // recebe as turmas e adiciona o usuario na turma
    const {turmas: novasTurmas} = request.body
    if (!novasTurmas) return
    const userId = user._id
    const roleField = user.role === 'teacher' || user.role === 'admin' ? 'teachers' : 'students'
    await Turma.updateMany(
      { [roleField]: userId },
      { "$pull": { [roleField]: userId } },
      { "multi": true },
    )
    await Turma.updateMany(
      { "_id": { "$in": novasTurmas } },
      { "$addToSet": { [roleField]: userId } },
      { "multi": true },
    );
   
  }

  override async posRead(user: IUser): Promise<void> {
    const roleField = user.role === 'teacher' || user.role === 'admin' ? 'teachers' : 'students'
    const turmas = await Turma.find({[roleField]: user._id}).populate("disciplina").populate("aulas").exec()
    user._doc.turmas = turmas
  }
 
  professoras = async (request: Request, response: Response): Promise<Response> => {
    const pesquisa = this.pesquisaPadrao(request)
    pesquisa[0] = {
      ...pesquisa[0],
      $or: [
        { 'role': 'admin' },
        { 'role': 'teacher' }
      ]
    }
    const result = await this.getEntity().paginate(...pesquisa)

    return response.status(200).json({ data: result.docs, total: result.totalPages });
  };

  alunas = async (request: Request, response: Response): Promise<Response> => {
    const pesquisa = this.pesquisaPadrao(request)
    pesquisa[0] = {
      ...pesquisa[0],
      role: 'student'
    }
    const result = await this.getEntity().paginate(...pesquisa)

    return response.status(200).json({ data: result.docs, total: result.totalPages });
  };



}

export default new UserController();
