const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: parseInt(process.env.EMAIL_PORT, 10),
  secure: process.env.EMAIL_PORT === "465", // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// console.log("EMAIL_HOST:", process.env.EMAIL_HOST);
// console.log("EMAIL_PORT:", process.env.EMAIL_PORT);
// console.log("EMAIL_USER:", process.env.EMAIL_USER);
// console.log("EMAIL_PASS:", process.env.EMAIL_PASS);

const sendEmail = async (emailOptions) => {
  try {
    // console.log("-------------------");
    // console.log(transporter);
    await transporter.sendMail(emailOptions);
    console.log("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

// const testEmailOptions = {
//   from: process.env.EMAIL_USER,
//   to: "snehraval17@gmail.com",
//   subject: "Test Email",
//   text: "This is a test email.",
// };

// sendEmail(testEmailOptions);

module.exports = {
  sendEmail,
};
