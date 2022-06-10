import { Document } from 'mongoose';
import IMaterial from './material';
import ITurma from './turma';

interface IAula extends Document {
  title: String;
  description: String;
  date: Date;
  scheduledHour: String;
  duration: Number;
  link: String;
  materiais: IMaterial[];
  turma: ITurma;
}

export default IAula;
