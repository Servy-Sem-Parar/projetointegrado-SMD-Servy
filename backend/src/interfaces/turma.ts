import { Document } from 'mongoose';
import mongoose from '../database';
import IDisciplina from './disciplina';
import IMaterial from './material';
import IUser from './user';

interface ITurma extends Document {
  name: String;
  teachers: IUser[],
  students: IUser[],
  materiais: IMaterial[],
  disciplina: IDisciplina
}

export default ITurma;
