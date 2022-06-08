import { Document } from 'mongoose';
import ITurma from './turma';

interface IDisciplina extends Document {
  name: String;
  description: String;
}

export default IDisciplina;
