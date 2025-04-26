const express = require("express");
const studentRoutes = require('./studentRoutes')

const v1Router = express.Router();

v1Router.use("/user", studentRoutes);


module.exports = v1Router;