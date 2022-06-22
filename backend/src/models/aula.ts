import { Schema } from 'mongoose';
import IAula from '@interfaces/aula';
import paginate from 'mongoose-paginate-v2';
import mongoose from '../database';

const AulaSchema = new Schema<IAula>({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  date: {
    type: Date,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
  materiais: [{
    name: String,
    link: String,
    date: Date,
  }],
  turma: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Turma',
    required: true,
  },
});

AulaSchema.plugin(paginate);

const Aula = mongoose.model<IAula>('Aula', AulaSchema);

export default Aula;
