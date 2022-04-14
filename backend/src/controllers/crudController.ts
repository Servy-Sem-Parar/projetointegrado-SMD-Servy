import { Request, Response } from 'express';
import User from '@models/user';
import IUser from '@interfaces/user';
import HttpError from '@models/errors/HttpError';
import { Document, Model } from 'moongose';
import mongoose from '../database';

require('express-async-errors');

abstract class CrudController<I, T extends Model<I>> {
  abstract getEntity(): T;

  async createFromParameters(request: Request): Promise<Document<unknown, any, I> & I> {
    const parameters = request.body;

    const Entity = this.getEntity();
    const entity = new Entity({
      _id: new mongoose.Types.ObjectId(),
      ...parameters,
    });

    const result = await entity.save();

    return this.getEntity().findById(result.id);
  }

  async updateFromParameters(request: Request): Promise<Document<unknown, any, I> & I> {
    const parameters = request.body;
    const { id } = request.params;

    const result = await this.getEntity().updateOne({ _id: id }, parameters);

    return this.getEntity().findById(id);
  }

  create = async (request: Request, response: Response): Promise<Response> => {
    const result = await this.createFromParameters(request);

    return response.status(201).json({ data: result });
  };

  read = async (request: Request, response: Response): Promise<Response> => {
    const result = await this.getEntity().findById(request.params.id).exec();

    return response.status(200).json({ data: result });
  };

  update = async (request: Request, response: Response): Promise<Response> => {
    const result = await this.updateFromParameters(request);

    return response.status(200).json({ data: result });
  };

  delete = async (request: Request, response: Response): Promise<Response> => {
    const result = await this.getEntity().deleteOne({ _id: request.params.id }).exec();

    return response.status(200).json({ data: result });
  };

  list = async (request: Request, response: Response): Promise<Response> => {
    const result = await this.getEntity().find().exec();

    return response.status(200).json({ data: result });
  };
}

export default CrudController;
