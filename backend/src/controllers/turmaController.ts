import { Request, Response } from 'express';
import Turma from '@models/turma';
import ITurma from '@interfaces/turma';
import HttpError from '@models/errors/HttpError';
import Aula from '@models/aula';
import CrudController from './crudController';
import mongoose from '../database';
import Role from '../enums/role';

require('express-async-errors');

class TurmaController extends CrudController<ITurma, typeof Turma> {
  override getEntity() {
    return Turma;
  }

  override populate(entity) {
    return entity
      .populate('disciplina')
      .populate('aulas')
      .populate('teachers')
      .populate('students');
  }

  override prepareQuery(request: Request, query: mongoose.FilterQuery<ITurma>, options: any): void {
    options.populate = ['teachers', 'students', 'aulas', 'disciplina'];
    const {
      name, level, userId, disciplina,
    } = request.query;
    if (name) {
      query.name = { $regex: new RegExp(name as string), $options: 'i' };
    }
    if (level) {
      query.level = { $regex: new RegExp(level as string), $options: 'i' };
    }

    if (userId) {
      query.$or = [
        { teachers: userId },
        { students: userId },
      ];
    }
    if (disciplina) {
      query.disciplina = disciplina;
    }
  }

  finalizar = async (request: Request, response: Response): Promise<Response> => {
    const { id } = request.params;

    const turma = await Turma.findById(id);

    if (!turma) throw new HttpError('Turma não encontrada', 404);

    await Aula.deleteMany({ turma: turma._id });
    turma.students = [];
    turma.aulas = [];
    turma.save();

    return response.send({ data: turma });
  };
}

export default new TurmaController();
