import { Document } from 'mongoose';
import ITurma from './turma';

interface IMaterial extends Document {
  name: String;
  link: String;
  date: Date;
}

export default IMaterial;
