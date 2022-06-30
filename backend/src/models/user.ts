import IUser from '@interfaces/user';
import { Schema } from 'mongoose';
import bcrypt from 'bcryptjs';
import paginate from 'mongoose-paginate-v2';
import mongoose from '../database';
import Role from '../enums/role';
import UserStatus from '../enums/userStatus';
import SchoolType from '../enums/schoolType';

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
  address: {
    type: String,
  },
  role: {
    type: String,
    default: Role.STUDENT,
    enum: Role,
  },
  status: {
    type: String,
    default: UserStatus.APPROVED,
    enum: UserStatus,
  },
  schoolType: {
    type: String,
    default: SchoolType.PUBLIC,
    enum: SchoolType,
    required: true,
  },
  createdAt: {
    type: 'Date',
    default: Date.now,
  },
  wantedTurmas: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Turma',
  }],
  birthDate: {
    type: 'Date',
  }
});

UserSchema.plugin(paginate);

UserSchema.pre('save', async function (next) {
  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;

  next();
});

const User = mongoose.model<IUser>('User', UserSchema);

export default User;
