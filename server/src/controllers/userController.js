const createError = require("http-errors");
const fs = require("fs").promises;
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const { successResponse } = require("../controllers/responsController");
const mongoose = require("mongoose");
const { findWithId } = require("../services/findItem");
const { createJSONWebToken } = require("../helper/jsonWebToken");
const { jwtActKey, clientURL } = require("../secret");
const sendEmail = require("../helper/email");
const deleteImage = require("../helper/deleteImage");

//! Get All Users
const getUsers = async (req, res, next) => {
  try {
    const search = req.query.search || "";
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 5;

    const searchRegExp = new RegExp(".*" + search + ".*", "i");
    const filter = {
      isAdmin: { $ne: true },
      $or: [
        { name: { $regex: searchRegExp } },
        { email: { $regex: searchRegExp } },
        { phone: { $regex: searchRegExp } },
      ],
    };
    const options = { password: 0 };
    const users = await User.find(filter, options)
      .limit(limit)
      .skip((page - 1) * limit);
    const count = await User.find(filter).countDocuments();
    if (!users) throw createError(404, "No User Found!!!");

    return successResponse(res, {
      statusCode: 200,
      message: "All Users =>",
      payload: {
        users,
        pageination: {
          totalPages: Math.ceil(count / limit),
          currentPages: page,
          previousPage: page - 1 > 0 ? page - 1 : null,
          nextPage: page + 1 <= Math.ceil(count / limit) ? page + 1 : null,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

//! Get single user
const getUserById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const options = { password: 0 };
    const user = await findWithId(User, id, options);
    return successResponse(res, {
      statusCode: 200,
      message: "User returned successfully.",
      payload: { user },
    });
  } catch (error) {
    next(error);
  }
};

//! Delete User
const deleteUserById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const options = { password: 0 };
    const user = await findWithId(User, id, options);
    const userImagePath = user.image;
    deleteImage(userImagePath);

    await User.findByIdAndDelete({
      _id: id,
      isAdmin: false,
    });

    return successResponse(res, {
      statusCode: 200,
      message: "User deleted successfully.",
    });
  } catch (error) {
    next(error);
  }
};

//! Create User
const processRegister = async (req, res, next) => {
  try {
    const { name, email, password, phone, address } = req.body;
    const userExists = await User.exists({ email: email });
    if (userExists) {
      throw createError("409", "User With This Email Alreday Exists");
    }

    //* Create jwt
    const token = createJSONWebToken(
      {
        name,
        email,
        phone,
        password,
        address,
      },
      jwtActKey,
      "10m"
    );
    //prepare email
    const emailData = {
      email,
      subject: "Account Activation Mail.",
      html: `
      <h2> Hello ${name} !</h2>
      <pre>Please click the link To confirm SignUp
      <a href="${clientURL}/usr/verify/${token}}" target="_blank">Click Here !</a></pre>
      `,
    };

    //send email
    try {
      await sendEmail(emailData);
    } catch (emailError) {
      next(createError(500, "Failed to send varification email"));
      return;
    }
    return successResponse(res, {
      statusCode: 200,
      message: `Please Go To Your Email ${email} For Next Process To SignUP!.`,
      payload: { token },
    });
  } catch (error) {
    next(error);
  }
};

//! verify user

const processVerify = async (req, res, next) => {
  try {
    const token = req.body.token;
    if (!token) throw createError(404, "Token Not Found!");
    const decoded = jwt.verify(token, jwtActKey);
    await User.create(decoded);
    return successResponse(res, {
      statusCode: 201,
      message: "User Created Successfully.",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getUsers,
  getUserById,
  deleteUserById,
  processRegister,
  processVerify,
};
