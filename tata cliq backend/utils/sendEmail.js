// utils/sendEmail.js
const nodemailer = require('nodemailer');

const sendEmail = async (email, subject, htmlContent) => {
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL_USER, // Your email
      pass: process.env.EMAIL_PASS, // Your email password or App Password
    },
  });

  await transporter.sendMail({
    from: '"Your App" <your@email.com>',
    to: email,
    subject: subject,
    html: htmlContent,
  });
};

module.exports = sendEmail;
