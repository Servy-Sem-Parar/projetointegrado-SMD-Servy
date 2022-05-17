import { Request, Response } from 'express';
import Disciplina from '@models/disciplina';
import IDisciplina from '@interfaces/disciplina';
import HttpError from '@models/errors/HttpError';
import CrudController from './crudController';
import mongoose from '../database';
import Role from '../enums/role';

require('express-async-errors');

class DisciplinaController extends CrudController<IDisciplina, typeof Disciplina> {
  override getEntity() {
    return Disciplina;
  }

  override populate(entity) {
    return entity;
  }
}

export default new DisciplinaController();
