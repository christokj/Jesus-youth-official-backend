const express = require("express");
const studentRoutes = require('./studentRoutes')
const adminRoutes = require('./adminRoutes')

const v1Router = express.Router();

v1Router.use("/user", studentRoutes);
v1Router.use("/admin", adminRoutes);


module.exports = v1Router;