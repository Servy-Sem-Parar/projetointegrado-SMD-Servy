import { Request, Response } from 'express';
import Turma from '@models/turma';
import Aula from '@models/aula';
import IAula from '@interfaces/aula';
import HttpError from '@models/errors/HttpError';
import CrudController from './crudController';
import mongoose from '../database';
import Role from '../enums/role';
import { ParamsDictionary } from 'express-serve-static-core';
import { ParsedQs } from 'qs';

require('express-async-errors');

class AulaController extends CrudController<IAula, typeof Aula> {
  override getEntity() {
    return Aula;
  }

  override populate(entity) {
    return entity
      .populate('materiais');
  }

  override prepareQuery(request: Request, query: mongoose.FilterQuery<IAula>, options: any): void {
    options.populate = ['materiais']
    const {title, turma, dateStart, dateEnd} = request.query
    if (title) {
      query.title = {$regex: new RegExp(title as string), $options: "i"}
    }
    if (turma) {
      query.turma = turma
    }
    if (dateStart || dateEnd){
      query.date = {
        $gte: dateStart, 
        $lt: dateEnd
      }
    }
  }

  override async posUpdate(result: IAula, request: Request): Promise<void> {
    await Turma.updateMany(
      { "_id": { "$in": [result.turma._id] } },
      { "$addToSet": { "aulas": result._id } },
      { "multi": true },
    )
  }

}

export default new AulaController();
