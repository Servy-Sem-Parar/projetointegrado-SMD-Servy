import mongoose, { ConnectOptions } from 'mongoose';
import config from '../config/config';

const options: ConnectOptions = {

};

mongoose.connect(config.databaseUrl, options);
mongoose.Promise = global.Promise;

export default mongoose;
