const nodemailer = require("nodemailer");
const { smtpUSER, smtpPass } = require("../secret");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for port 465, false for other ports
  auth: {
    user: smtpUSER,
    pass: smtpPass,
  },
});

const sendEmail = async (emailData) => {
  try {
    const mailoOptions = {
      from: smtpUSER,
      to: emailData.email,
      subject: emailData.subject,
      html: emailData.html,
    };
    const info = await transporter.sendMail(mailoOptions);
    console.log("Email Send", info.response);
  } catch (error) {
    console.error("error occured while sending email");
    throw error;
  }
};
module.exports = sendEmail;
