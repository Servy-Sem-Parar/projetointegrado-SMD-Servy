import { Document } from 'mongoose';
import ITurma from './turma';

interface IDisciplina extends Document {
  name: String;
  icon: String;
  description: String;
}

export default IDisciplina;
