import { Document } from 'moongose';
import mongoose from '../database';
import IDisciplina from './disciplina';
import IMaterial from './material';
import IUser from './user';

interface ITurma extends Document {
  name: String;
  participants: IUser[],
  materiais: IMaterial[],
  disciplina: IDisciplina
}

export default ITurma;
