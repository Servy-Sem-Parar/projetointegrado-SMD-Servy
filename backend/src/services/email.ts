import config from '@config/config';
import nodemailer from 'nodemailer';

const emailer = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: config.emailLogin,
    pass: config.emailPassword,
  },
});

export default emailer;
