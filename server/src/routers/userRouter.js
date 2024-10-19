const express = require("express");
const userRouter = express.Router();
const {
  getUsers,
  getUserById,
  deleteUserById,
  processRegister,
  processVerify,
} = require("../controllers/userController");
const upload = require("../middleware/uploadfile");
const { userReg } = require("../validators/auth");
const runValidation = require("../validators/index");

userRouter.get("/:id", getUserById);
userRouter.get("/", getUsers);

userRouter.post(
  "/reg",
  upload.single("image"),
  userReg,
  runValidation,
  processRegister
);
userRouter.post("/verify", processVerify);

userRouter.delete("/:id", deleteUserById);

module.exports = userRouter;
