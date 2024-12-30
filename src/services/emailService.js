// src/services/emailService.js
// Brief: Handles sending emails (e.g., order confirmations) via Nodemailer.
const nodemailer = require('nodemailer');
const keys = require('../config/keys');

const transporter = nodemailer.createTransport({
  host: keys.EMAIL_HOST,
  port: keys.EMAIL_PORT,
  auth: {
    user: keys.EMAIL_USER,
    pass: keys.EMAIL_PASS
  }
});

exports.sendEmail = async (to, subject, html) => {
  return transporter.sendMail({ from: keys.EMAIL_USER, to, subject, html });
};
