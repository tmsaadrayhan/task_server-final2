// utils/sendEmail.js
const nodemailer = require('nodemailer');
require('dotenv').config();

const sendPasswordResetEmail = async (email, resetToken) => {
  try {
    const transporter = nodemailer.createTransport({
      service: process.env.EMAIL_SERVICE,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Password Reset',
      html: `
        <p>You requested a password reset</p>
        <p>Click this <a href="http://localhost:5173/reset-password/${resetToken}">link</a> to set a new password.</p>
      `,
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error(error);
    throw new Error('Error sending password reset email');
  }
};

module.exports = { sendPasswordResetEmail };
