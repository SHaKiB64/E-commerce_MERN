const User = require("../models/userModel");
const data = require("../data");
const seedUser = async (req, res, next) => {
  try {
    //deleting all existing user
    await User.deleteMany({});

    //insert new user
    const users = await User.insertMany(data.users);

    //succses
    return res.status(201).json(users);
  } catch (error) {
    next(error);
  }
};

module.exports = { seedUser };
