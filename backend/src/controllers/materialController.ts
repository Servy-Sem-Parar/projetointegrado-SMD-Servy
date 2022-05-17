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
}

export default new MaterialController();
