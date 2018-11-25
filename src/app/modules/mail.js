import nodemailer from 'nodemailer'
import hbs from 'nodemailer-express-handlebars'
import path from 'path'

import { host, port, auth } from '../../config/mailer'

const transport = nodemailer.createTransport({ host, port, auth });

transport.use('compile', hbs({
    viewEngine: 'handlebars',
    viewPath: path.resolve('./src/resources/mail/'),
    extName: '.html',
}));
export default transport