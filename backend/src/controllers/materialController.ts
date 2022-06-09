import { Request, Response } from 'express';
import Material from '@models/material';
import IMaterial from '@interfaces/material';
import HttpError from '@models/errors/HttpError';
import CrudController from './crudController';
import mongoose from '../database';
import Role from '../enums/role';

require('express-async-errors');

class MaterialController extends CrudController<IMaterial, typeof Material> {
  override getEntity() {
    return Material;
  }

  override populate(entity) {
    return entity;
  }

  override prepareQuery(request: Request, query: mongoose.FilterQuery<IMaterial>, options: any): void {
    const {name} = request.query
    if (name) {
      query.name = {$regex: new RegExp(name as string), $options: "i"}
    }
  }

}

export default new MaterialController();
