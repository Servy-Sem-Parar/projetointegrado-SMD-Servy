import { Document } from 'mongoose';
import Role from '../enums/role';
import ITurma from './turma';

interface IUser extends Document {
  name: String;
  email: String;
  phone_number: String;
  password: String;
  createdAt: Date;
  role: Role;
}

export default IUser;
