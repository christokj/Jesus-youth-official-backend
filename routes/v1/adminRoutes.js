const express = require("express");
const asyncHandler = require("../../utils/asyncHandler");
const { getAllStudents, adminLogin, adminSignup, deleteStudent, updateStudent, updateGender, updateVisited, getAllAdmins, deleteAdmin } = require("../../controllers/adminController");
const { authAdmin } = require("../../middlewares/authAdmin");

const router = express.Router();

router.post("/login", asyncHandler(adminLogin));
router.post("/signup", asyncHandler(adminSignup));
router.post("/update-paid", asyncHandler(authAdmin), asyncHandler(updateStudent));
router.post("/update-gender", asyncHandler(authAdmin), asyncHandler(updateGender));
router.post("/update-visited", asyncHandler(authAdmin), asyncHandler(updateVisited));
router.get("/get-data", asyncHandler(authAdmin), asyncHandler(getAllStudents));

// Admin Management
router.get("/get-admins", asyncHandler(authAdmin), asyncHandler(getAllAdmins));
router.delete("/delete-admin/:id", asyncHandler(authAdmin), asyncHandler(deleteAdmin));

router.delete('/delete-student/:id', asyncHandler(authAdmin), asyncHandler(deleteStudent));

module.exports = router;
