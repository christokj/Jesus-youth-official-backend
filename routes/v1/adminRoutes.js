const express = require("express");
const asyncHandler = require("../../utils/asyncHandler");
const { getAllStudents, adminLogin, deleteStudent, updateStudent } = require("../../controllers/adminController");
const { authAdmin } = require("../../middlewares/authAdmin");

const router = express.Router();

router.post("/login", asyncHandler(adminLogin));
router.post("/update-paid", asyncHandler(authAdmin), asyncHandler(updateStudent));
router.get("/get-data", asyncHandler(authAdmin), asyncHandler(getAllStudents));
// router.delete('/delete-student/:id', asyncHandler(authAdmin), asyncHandler(deleteStudent));

module.exports = router;
