import { Document } from 'mongoose';
import UserStatus from '../enums/userStatus';
import Role from '../enums/role';
import ITurma from './turma';

interface IUser extends Document {
  name: String;
  email: String;
  phone_number: String;
  address: String;
  password: String;
  createdAt: Date;
  role: Role;
  status: UserStatus;
}

export default IUser;
