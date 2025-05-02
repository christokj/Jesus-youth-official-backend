const express = require("express");
const asyncHandler = require("../../utils/asyncHandler");
const { getAllStudents, adminLogin } = require("../../controllers/adminController");

const router = express.Router();

router.post("/login", asyncHandler(adminLogin));
router.get("/get-data", asyncHandler(getAllStudents));

module.exports = router;
