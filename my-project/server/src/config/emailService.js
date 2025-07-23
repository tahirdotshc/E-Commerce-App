import nodemailer from "nodemailer";
import { config } from '../config/index.js';

const sendEmail=async({ to, subject, html })=>{
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: config.email,
        pass: config.email_pass,
    }
  });
console.log(sendEmail);

  await transporter.sendMail({
    from: `"Ecommerce App" <${config.email}>`,
    to,
    subject,
    html,
  });
}

export default sendEmail;