import IUser from '@interfaces/user';
import { Schema } from 'mongoose';
import bcrypt from 'bcryptjs';
import paginate from 'mongoose-paginate-v2';
import mongoose from '../database';
import Role from '../enums/role';

require('mongoose-type-email');

const UserSchema = new Schema<IUser>({
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
  phone_number: {
    type: String,
  },
  role: {
    type: String,
    default: Role.STUDENT,
    enum: Role,
  },
  createdAt: {
    type: 'Date',
    default: Date.now,
  },
});

UserSchema.plugin(paginate);

UserSchema.pre('save', async function (next) {
  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;

  next();
});

const User = mongoose.model<IUser>('User', UserSchema);

export default User;
