const express = require("express");
const asyncHandler = require("../../utils/asyncHandler");
const { getAllStudents } = require("../../controllers/adminController");

const router = express.Router();

router.get("/get-data", asyncHandler(getAllStudents));

module.exports = router;
