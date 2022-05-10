import { Document } from 'moongose';
import ITurma from './turma';

interface IMaterial extends Document {
  name: String;
  link: String;
}

export default IMaterial;
