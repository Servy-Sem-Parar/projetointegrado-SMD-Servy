import IUser from '@interfaces/user';
import { Schema } from 'mongoose';
import bcrypt from 'bcryptjs';
import mongoose from '../database';

require('mongoose-type-email');

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: mongoose.SchemaTypes.Email,
    unique: true,
    required: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  createdAt: {
    type: 'Date',
    default: Date.now,
  },
});

UserSchema.pre('save', async function (next) {
  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;

  next();
});

const User = mongoose.model<IUser>('User', UserSchema);

export default User;
