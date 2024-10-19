const { body } = require("express-validator");
//! Registration Validation
const userReg = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("User Name Required")
    .isLength({ min: 3, max: 31 })
    .withMessage("User Name should be 3-31 Charecters Long"),
  body("email")
    .trim()
    .notEmpty()
    .withMessage("User Email Required")
    .isEmail()
    .withMessage("Invalid Email Address"),
  body("password")
    .trim()
    .notEmpty()
    .withMessage("User Password Required")
    .isLength({ min: 6 })
    .withMessage("User Password should be 6 Charecters Long")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/
    )
    .withMessage(
      "Password should contain at least one uppercase letter, one lowercase letter, one number, and one special character."
    ),
  body("address")
    .trim()
    .notEmpty()
    .withMessage("User Address Required")
    .isLength({ min: 3 })
    .withMessage("User Address should be 3 Charecters Long"),
  body("phone").trim().notEmpty().withMessage("User Phone Required"),
  body("images").optional().isString().withMessage("User Image Required"),
];

module.exports = { userReg };
