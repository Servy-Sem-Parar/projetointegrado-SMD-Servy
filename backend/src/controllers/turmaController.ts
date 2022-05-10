import { Request, Response } from 'express';
import Turma from '@models/turma';
import ITurma from '@interfaces/turma';
import HttpError from '@models/errors/HttpError';
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
      .populate('materiais')
      .populate('teachers')
      .populate('students');
  }
}

export default new TurmaController();
