import { Request, Response } from 'express';
import User from '@models/user';
import IUser from '@interfaces/user';
import HttpError from '@models/errors/HttpError';
import { Document, Model } from 'mongoose';
import mongoose from '../database';
import { FilterQuery } from "mongoose";

require('express-async-errors');

abstract class CrudController<I, T extends Model<I>> {
  abstract getEntity(): T;

  populate(entity): any {
    return entity;
  }

  prepareQuery(request: Request, query: FilterQuery<I>, options: any): void {

  }

  posCreate(result: I, request:Request): void {
    this.posUpdate(result, request)
  }

  posUpdate(result: I, request:Request): void {
    
  }

  async posRead(result: I): Promise<void> {
    
  }

  async createFromParameters(request: Request): Promise<Document<unknown, any, I> & I> {
    const parameters = request.body;

    const Entity = this.getEntity();
    const entity = new Entity({
      _id: new mongoose.Types.ObjectId(),
      ...parameters,
    });

    const result = await entity.save();

    return this.populate(this.getEntity().findById(result.id));
  }

  async updateFromParameters(request: Request): Promise<Document<unknown, any, I> & I> {
    const parameters = request.body;
    const { id } = request.params;

    const result = await this.getEntity().updateOne({ _id: id }, parameters);

    return this.populate(this.getEntity().findById(id));
  }

  create = async (request: Request, response: Response): Promise<Response> => {
    const result = await this.createFromParameters(request);
    this.posCreate(result, request)
    return response.status(201).json({ data: result });
  };

  read = async (request: Request, response: Response): Promise<Response> => {
    const result = await this.populate(this.getEntity().findById(request.params.id)).exec();
    await this.posRead(result);
    return response.status(200).json({ data: result });
  };

  update = async (request: Request, response: Response): Promise<Response> => {
    const result = await this.updateFromParameters(request);
    this.posUpdate(result, request)
    return response.status(200).json({ data: result });
  };

  delete = async (request: Request, response: Response): Promise<Response> => {
    const result = await this.populate(this.getEntity().deleteOne({ _id: request.params.id })).exec();

    return response.status(200).json({ data: result });
  };

  list = async (request: Request, response: Response): Promise<Response> => {
    const pesquisa = this.pesquisaPadrao(request)

    const result = await this.getEntity().paginate(...pesquisa)

    return response.status(200).json({ data: result.docs, total: result.totalPages });
  };

  pesquisaPadrao = (request: Request): any => {
    const {
      offset,
      limit,
      order = "id",
      sort = "desc",
    } = request.query;

    const query: FilterQuery<I> = {};
    
    const options = {
      sort: { [sort as string]: order === "desc" ? -1 : 1 },
    };

    this.prepareQuery(request, query, options)

    return [query, {offset, limit: limit || 10, options}]
  }

}

export default CrudController;
