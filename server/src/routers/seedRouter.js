const express = require("express");
const seedRouter = express.Router();
const {seedUser} =require('../controllers/seedController')

seedRouter.get("/", seedUser);

module.exports = seedRouter;