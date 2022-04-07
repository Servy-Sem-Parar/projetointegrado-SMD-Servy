import { Document } from 'moongose';
import Role from '../enums/role';

interface IUser extends Document {
  name: String;
  email: String;
  password: String;
  createdAt: Date;
  role: Role;
}

export default IUser;
