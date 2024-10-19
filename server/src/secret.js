require("dotenv").config();
const serverPort = process.env.SERVER_PORT || 3001;
const mongodbURL =
  process.env.MONGODB_URL || "mongodb://localhost:27017/ecommerceMernDB";
const defaultUserImage =
  process.env.DEFAULT_USER_IMAGE || "public/images/users/profile.jpeg";
const jwtActKey = process.env.jwtActKey || "mangoapple";
const smtpUSER = process.env.SMTP_USER || "";
const smtpPass = process.env.SMTP_PASS || "";
const clientURL = process.env.CLIENT_URL || "";

module.exports = {
  serverPort,
  mongodbURL,
  defaultUserImage,
  jwtActKey,
  smtpUSER,
  smtpPass,
  clientURL,

};
