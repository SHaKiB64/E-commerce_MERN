// const users = [
//   { id: 1, name: "SHaKiB" },
//   { id: 2, name: "ABC" },
// ];

// module.exports = users;

const { Schema, model } = require("mongoose");
const bcrypt = require("bcryptjs");
const { defaultUserImage } = require("../secret"); // Make sure to add the correct path to your config

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "User Name Required"],
      trim: true,
      maxlength: [31, "User name can't be more than 31 Characters"],
      minlength: [2, "User name can't be less than 2 Characters"],
    },
    email: {
      type: String,
      required: [true, "User Email Required"],
      trim: true,
      unique: true,
      lowercase: true,
      validate: {
        validator: function (v) {
          return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v); // Add the dot here
        },
        message: "Please enter a valid email!",
      },
    },
    password: {
      type: String,
      required: [true, "User Password Required"],
      minlength: [6, "Password can't be less than 6 characters"],
      set: (v) => bcrypt.hashSync(v, bcrypt.genSaltSync(10)),
    },
    image: {
      type: String,
      default: defaultUserImage,
    },
    address: {
      type: String,
      required: [true, "User Address Required"],
      minlength: [3, "User Address should be 6 Charecters Long"],
    },
    phone: {
      type: String,
      required: [true, "User Phone Required"],
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    isBanned: {
      type: Boolean, // Fixed the typo here
      default: false,
    },
  },
  { timestamps: true }
);

const User = model("Users", userSchema);
module.exports = User;
