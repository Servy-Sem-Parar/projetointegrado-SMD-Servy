import { Document } from 'mongoose';
import UserStatus from '../enums/userStatus';
import Role from '../enums/role';
import ITurma from './turma';
import SchoolType from '../enums/schoolType';

interface IUser extends Document {
  name: String;
  email: String;
  phone_number: String;
  address: String;
  password: String;
  createdAt: Date;
  role: Role;
  schoolType: SchoolType;
  status: UserStatus;
  wantedTurmas: ITurma[];
  birthDate: Date;
}

export default IUser;
