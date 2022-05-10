import { Schema } from 'mongoose';
import ITurma from '@interfaces/turma';
import paginate from 'mongoose-paginate-v2';
import mongoose from '../database';
import User from './user';
import Material from './material';
import Disciplina from './disciplina';

const TurmaSchema = new Schema<ITurma>({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  teachers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],
  students: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],
  materiais: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Material',
  }],
  disciplina: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Disciplina',
    required: true,
  },
});

TurmaSchema.plugin(paginate);

const Turma = mongoose.model<ITurma>('Turma', TurmaSchema);

export default Turma;
