import { Document } from 'moongose';

interface IUser extends Document {
  name: String;
  email: String;
  password: String;
  createdAt: Date;
}

export default IUser;
