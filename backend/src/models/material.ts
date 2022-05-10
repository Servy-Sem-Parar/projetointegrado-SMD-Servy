import { Schema } from 'mongoose';
import IMaterial from '@interfaces/material';
import paginate from 'mongoose-paginate-v2';
import mongoose from '../database';

const MaterialSchema = new Schema<IMaterial>({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  link: {
    type: String,
    required: true,
  },
});

MaterialSchema.plugin(paginate);

const Material = mongoose.model<IMaterial>('Material', MaterialSchema);

export default Material;
