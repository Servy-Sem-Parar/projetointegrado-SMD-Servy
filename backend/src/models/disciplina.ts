import { Schema } from 'mongoose';
import IDisciplina from '@interfaces/disciplina';
import paginate from 'mongoose-paginate-v2';
import mongoose from '../database';

const DisciplinaSchema = new Schema<IDisciplina>({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  icon: {
    type: String,
  },
  color: {
    type: String,
  },
});

DisciplinaSchema.plugin(paginate);

const Disciplina = mongoose.model<IDisciplina>('Disciplina', DisciplinaSchema);

export default Disciplina;
