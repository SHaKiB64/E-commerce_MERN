const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const createError = require("http-errors");
const rateLimit = require("express-rate-limit");
const { errorResponse } = require("./controllers/responsController");
const xssClean = require("xss-clean");

const userRouter = require("./routers/userRouter");
const seedRouter = require("./routers/seedRouter");

const app = express();

app.use(xssClean());
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/usr", userRouter);
app.use("/users", seedRouter);


//! Middleware's
const rateLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, //1 minute
  max: 5,
  message: "To Many Attempts!!",
});

// const isLoggedIn = (req, res, next) => {
//   const login = true;
//   if (login) {
//     req.body.id = 11;
//     next();
//   } else {
//     return res.status(401).json({ message: "Please Login First" });
//   }
// };

app.get("/test", rateLimiter, (req, res) => {
  res.status(200).send({
    message: " API is  Working Fine !!! ",
  });
});

//!client error handling
app.use((req, res, next) => {
  next(createError(404, "Not Found"));
});

//!server error handling -> all the errors
app.use((err, req, res, next) => {
  return errorResponse(res, {
    statusCode: err.status,
    message: err.message,
  });
});

module.exports = app;
